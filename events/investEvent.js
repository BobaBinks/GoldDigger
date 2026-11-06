import { EventEmitter } from 'node:events'
import { sendResponse } from '../utils/sendResponse.js'
import { price } from './priceEvent.js'
import puppeteer from 'puppeteer';
import path from 'node:path';
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import nodemailer from 'nodemailer';
import process from 'node:process';


export const investEvent = new EventEmitter()

const createPDF = async (date, amountInvested, price, gold) => {
    const invoiceId = crypto.randomUUIDv7()

    const html = 
    `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; margin: 30px; color: #333; }
                    h1 { color: #0066cc; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h1>Invoice #${invoiceId}</h1>
                <p>Thank you for your business! Below is the breakdown of your recent purchase.</p>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Item Description</th>
                        <th>Price</th>
                        <th>Paid</th>
                        <th>Gold Obtained</th>
                    </tr>
                    <tr>
                        <td>${date}</td>
                        <td>Gold</td>
                        <td>Price per Oz: ${price}</td>
                        <td>Amount Paid: ${amountInvested}</td>
                        <td>Gold Sold: ${gold} Oz</td>
                    </tr>
                </table>
            </body>
        </html>
    `

    try {
        const fileName = `Invoice_${invoiceId}.pdf`
        const pdfPath = path.join('pdf', fileName)
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setContent(html)
        await page.pdf({
            format: "LETTER",
            path: pdfPath
        })
        
        return pdfPath
    } catch (error) {
        throw new Error(`Failed to create PDF: ${error}`)
    }
}

const sendEmail = async (date, amountInvested, price, gold) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: process.env.SENDER,
            pass: process.env.APP_PASSWORD
        },
        // https://nodemailer.com/

    })

    try {
        await transporter.verify();

        let pdfPath = await createPDF(date, amountInvested, price, gold)
        
        pdfPath = path.join(process.cwd(),  pdfPath)
        await transporter.sendMail({
            from: process.env.SENDER,
            to: process.env.TO,
            subject: "Hello World",
            text: "This is the plaintext version of the email.",
            html: "<p>This is the <strong>HTML version</strong> of the email.</p>",
            attachments: [
                {
                    path: pdfPath
                }
            ]
        })
        
    } catch (error) {
        console.log(error)
    }

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