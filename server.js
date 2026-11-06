import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handlePrice } from './utils/price.js'
import { sendResponse } from './utils/sendResponse.js'
import { investEvent } from './events/investEvent.js'


const PORT = 5000
const baseDir = import.meta.dirname

const server = http.createServer(async (req, res) => {

    if(req.url === '/'){
        if(req.method === 'GET'){
            // handle
            req.url = `/index.html`
            return await serveStatic(req, res, baseDir)
        }
    }
    else if (req.url.startsWith('/users')){
        console.log(req.url)
        if(req.method === 'GET'){
            // handle
            req.url = `${req.url}.html`
            return await serveStatic(req, res, baseDir)
        }
    }
    else if (req.url.startsWith('/api')){
        // handle update price
        if(req.url === '/api/update-price'){
            return await handlePrice(req, res)
        }

        if(req.url === '/api/invest' && req.method === 'POST'){
            console.log("investing...")
            
            // get body
            const chunks = [];

            for await (let chunk of req) {
                chunks.push(chunk); 
            }

            try {
                let body = Buffer.concat(chunks).toString();
                body = JSON.parse(body)
                
                // emit event, pass res, amount
                investEvent.emit('invest-event', res, body.amount)


            } catch (error) {
                sendResponse(res, 404, 'application/json', JSON.stringify({error: error.message || "Invalid request payload"}))
            }
        }
    }
    else{
        // serve static resources
        await serveStatic(req, res, baseDir)
    }

})

server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})