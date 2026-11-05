import http from 'node:http'
import { handleGET } from './routeHandler/routeHandler.js'


const PORT = 5000
const baseDir = import.meta.dirname

const server = http.createServer(async (req, res) => {
    if(req.method === 'GET'){
        return await handleGET(req, res, baseDir)
    }

})

server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})