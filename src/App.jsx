import React, {useState, useEffect, useCallback, use} from 'react'
import './App.css'
import cloudyImg from './assets/cloudy.png'


function App() {
  const [weatherData, setWeatherData] = useState('')
  
  
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

        <h1>London</h1>
        <img src={cloudyImg} alt="Cloudy Weather" width={100}/>

        <p>45 C</p>


      </div>
    </div>
  )
}

export default App