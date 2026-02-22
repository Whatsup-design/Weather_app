import React, {useState, useEffect, useCallback} from 'react'
import './App.css'
import cloudyImg from './assets/cloudy.png'


function App() {
  const [inputCity, setInputCity] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('London')


  const fetchWeatherData = useCallback(async ()=> {
    
    
    setLoading(true)
    setError(null)

    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
      if(!response.ok){
        throw new Error('Failed to fetch weather data')
      }
      const data = await response.json()
      setData(data)
      
    }
    catch(error){
      setError(error.message)
    }
    finally{
      setLoading(false)
    }
    console.log(data)

  },[city])

  useEffect(() => {
    fetchWeatherData()
  
    
  }, [fetchWeatherData])

  function handleSearch(){
    if(inputCity.trim() === '') return
    setCity(inputCity)
    setInputCity('')
  }  
  
  
  return (
    <div className='container'>
        <div className='child-element'>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {data && 
          <>
            <div className="search-row">
              <input
                value={inputCity}
                type="text"
                placeholder="Enter city name"
                onChange={(e)=> setInputCity(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>

            <h1>{city}</h1>
            <img src={cloudyImg} alt="Cloudy Weather" width={100}/>

            <div className='container-data'>
                <div className='temp-container'>
                  <h4>Temperature</h4>
                  <p>{data.main.temp} C</p>
                </div>
                <div className='hum-container'>
                  <h4>Humidity</h4>
                  <p>{data.main.humidity} %</p>
                </div>
                
                
            </div>

          </>
          }
          
          


        </div>
    </div>
  )
}

export default App