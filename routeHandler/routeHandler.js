import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from '../utils/sendResponse.js'
import { getContentType } from '../utils/getContentType.js'

import { serveStatic } from '../utils/serveStatic.js'

const handlePriceEvent = async (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    setInterval(() => {
        const price = Math.floor(Math.random() * 100 + 1)
        res.write(`data: ${JSON.stringify({event: "update-price", price: price})}\n\n`)
    }, 1000)
}

export const handleGET = async (req, res, baseDir) => {
    if(!req.url.startsWith('/update-price')){
        return await serveStatic(req, res, baseDir)
    }

    await handlePriceEvent(req, res)
}