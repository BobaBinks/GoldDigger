import { priceEvent } from "../events/priceEvent.js"

export const handlePrice = async (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    

    priceEvent.on('update-price', (price) => {
        res.write(`data: ${JSON.stringify({event: "update-price", price: price})}\n\n`)
    })
}
