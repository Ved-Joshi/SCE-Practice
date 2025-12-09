import { useState} from 'react'
import './App.css'
import StockTable from './components/StockTable'

const App = () => {

  const apiKey = import.meta.env.FINNHUB_API_KEY || ''

  const [stockData, setStockData] = useState([])
  const [min, setMin] = useState("")
  const [sec , setSec] = useState("")
  const [symbol , setSymbol] = useState("")

  const handleMinChange = (e) => {
    setMin(e.target.value)
  }
  const handleSecChange = (e) => {
    setSec(e.target.value)
  }
  const handleSymbolChange = (e) => {
    setSymbol(e.target.value)
  }
  const getStockData = async () => {
    try {
      if (!symbol) {
        console.log('No symbol provided. Skipping fetch.')
        return
      }
      if (!apiKey) {
        console.log('No API key found. Skipping fetch.')
        return
      }
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
      const data = await response.json()
      const currentTime = new Date()
      setStockData(prevData => [...prevData, {
        open: data.o,
        high: data.h,
        low: data.l,
        current: data.c,
        previousClose: data.pc,
        time: currentTime.toLocaleTimeString()
      }])
    } catch (error) {
      console.error("Error fetching stock data:", error)
    }
  }
  const handleSumbit = async () => {
    const timeOut = (parseInt(min || '0') * 60 + parseInt(sec || '0')) * 1000
    getStockData()
    setTimeout(getStockData, timeOut)
  }

  return (
    <div>
      <input style ={{margin: '10px'}} type="text" onChange={handleMinChange} placeholder='MIN'/>
      <input style ={{margin: '10px'}} type="text" onChange={handleSecChange} placeholder='SEC'/>
      <input style ={{margin: '10px'}} type="text" onChange={handleSymbolChange} placeholder='SYMBOL'/>
      <button style={{margin: '10px', backgroundColor: 'lightgreen', borderColor: 'transparent', borderRadius: '5px', padding: '5px 10px'}} onClick={handleSumbit}>SUBMIT</button>

      {stockData.length > 0 && <StockTable data={stockData} />}

    </div>
    
  )
}

export default App
