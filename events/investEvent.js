import { EventEmitter } from 'node:events'
import { sendResponse } from '../utils/sendResponse.js'
import { price } from './priceEvent.js'


export const investEvent = new EventEmitter()

const createPDF = (date, amountInvested, price, gold) => {

}

const sendEmail = (date, amountInvested, price, gold) => {
    const pdf = createPDF(date, amountInvested, price, gold)
}

const alertPurchase = (date, amountInvested, price, gold) => {
    console.log(`${date}, amount paid: ${amountInvested}, price per oz: ${price}, gold sold: ${gold}`)
}


const makePurchase = async (res, amount) => {

    // amount of oz = amount / price
    // date / amount used / price of gold / amount of gold invested (oz)
    const date = new Date().toLocaleString()
    const gold = amount / price


    alertPurchase(date, amount, price, gold)
    sendEmail(date, amount, price, gold)

    sendResponse(res, 200, 'application/json', JSON.stringify({event: "invested", amount: amount}))
}

investEvent.on('invest-event', makePurchase)