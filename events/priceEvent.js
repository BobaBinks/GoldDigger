import { EventEmitter } from 'node:events'

export const priceEvent = new EventEmitter()


const priceUpdateInterval = 3000

const getRandomPrice = () => {
    return Math.floor(Math.random() * 100 + 1)
}

export let price = getRandomPrice()

setInterval(() => {
    price = getRandomPrice()
    priceEvent.emit('update-price', price)
}, priceUpdateInterval)