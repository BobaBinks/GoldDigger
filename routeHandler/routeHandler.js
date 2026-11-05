import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from '../utils/sendResponse.js'
import { getContentType } from '../utils/getContentType.js'

export const handleGET = async (req, res, baseDir) => {
        const publicDir = path.join(baseDir, 'public')

        
        try {
            let resource = req.url
            console.log("resource: ", resource)
            switch(req.url){
                case '/':
                    resource = 'index.html'
                    break
                case "/users":
                    resource = "users.html"
                    break
            }
            
            const pathToResource = path.join(publicDir, resource)

            const fileExtension = path.extname(pathToResource)

            const fileContent = await fs.readFile(pathToResource)

            sendResponse(res, 200, getContentType(fileExtension), fileContent)
        } catch (error) {
            console.log(`err: ${error}`)
            try {
                const pathTo404 = path.join(publicDir, '404.html')
                const content = await fs.readFile(pathTo404, 'utf8')

                sendResponse(res, 404, 'text/html', content)
                
            } catch (error) {
                // fallback response
                sendResponse(res, 404, 'text/html', 
                    `
                    <h2>404 - No gold here!</h2>
                    `
                )
            }
        }
}