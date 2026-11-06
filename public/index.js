const priceDisplayEl = document.getElementById('price-display')
const connectionStatusEl = document.getElementById('connection-status')
const investForm = document.getElementById('invest-form')
const connectedText = 'Live Price 🟢'

const priceEventSource = new EventSource("api/update-price")

priceEventSource.onmessage = (event) => {
    connectionStatusEl.textContent = connectedText
    const data = JSON.parse(event.data)
    priceDisplayEl.textContent = data.price
}

priceEventSource.onerror = () => {
    console.log("ERROR")
    connectionStatusEl.textContent = 'Disconnected'
}

investForm.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const investAmtEl = document.getElementById('investment-amount')
    const amount = Number(investAmtEl.value)
    investAmtEl.value = ""
    
    // make an invest request
    const response = await fetch('/api/invest', {
        method: "POST",
        body: JSON.stringify({amount: amount})
    })

    const data = await response.json()
    console.log(data)
})