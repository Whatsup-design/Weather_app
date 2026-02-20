import React, {useState, useEffect, useCallback, use} from 'react'
import './App.css'
import cloudyImg from './assets/cloudy.png'


function App() {

  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('London')
  const [weatherData, setWeatherData] = useState('')

  const fetchWeatherData = useCallback(async ()=> {
   setLoading(true)
   setError(null)
   
   try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY_HERE`)
    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }
    const data = await response.json()
    setWeatherData(data)
   } catch (err) {
    setError(err.message)
   } finally {
    setLoading(false)
   }
  })

  useEffect(() => {
    fetchWeatherData()
    
  }, [fetchWeatherData])

  
  
  
  return (
  <div className='container'>
      <div className='child-element'>
        
        <div className="search-row">
          <input
            value={weatherData}
            type="text"
            placeholder="Enter city name"
            onChange={(e)=> setWeatherData(e.target.value)}
          />
          <button>Search</button>
        </div>

        <h1>{city}</h1>
        <img src={cloudyImg} alt="Cloudy Weather" width={100}/>

        <p>45 C</p>


      </div>
    </div>
  )
}

export default App