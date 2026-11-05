import { EventEmitter } from 'node:events'

export const updatePriceEvent = new EventEmitter()

const sendUpdatedPrice = (res, price) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    res.write(`Data: ${JSON.stringify({event: "update-price", price: price})}\n\n`)
}

updatePriceEvent.on('price-updated', sendUpdatedPrice)