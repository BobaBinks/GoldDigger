const priceDisplayEl = document.getElementById('price-display')
const connectionStatusEl = document.getElementById('connection-status')
const connectedText = 'Live Price 🟢'

const priceEventSource = new EventSource("/update-price")

priceEventSource.onmessage = (event) => {
    connectionStatusEl.textContent = connectedText
    const data = JSON.parse(event.data)
    priceDisplayEl.textContent = data.price
}

priceEventSource.onerror = () => {
    console.log("ERROR")
    connectionStatusEl.textContent = 'Disconnected'
}
