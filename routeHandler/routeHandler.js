import { serveStatic } from '../utils/serveStatic.js'

export const handleGET = async (req, res, baseDir) => {
    if(!req.url.startsWith('/update-price')){
        return await serveStatic(req, res, baseDir)
    }

    await handlePriceEvent(req, res)
}