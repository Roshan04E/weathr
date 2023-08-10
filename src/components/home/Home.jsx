import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Home.css"
import {AiOutlineSearch} from "react-icons/ai"

const Weather = () => {
  const [city, setCity] = useState("[ CITY ]")
  const [input, setInput] = useState("")
  const [parameters, setParameters] = useState({
    main: "", //weather[0].main
    temperature: "", //main.temp
    humidity: "", //main.humidity
    wind: "", //wind.speed

  })



  function handleSubmit(e) {
    e.preventDefault();
    setCity(input)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=52d1d21d4c24f2085d72437a6da50a0b`)
      .then(response => {
        console.log(response);
        setParameters({
          main: response.data.weather[0].main,
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          wind: response.data.wind.speed,

        })
      })
      .catch(error => {
        setInput("")
        setCity("")
        alert("[+] Please check the input...")
        console.error('Error fetching weather data:', error);
      });

      setInput("")
  }


  return (
    <div>
      <h2>Weather in {city}</h2>
      <h1>{parameters.temperature}°C</h1>
      <br />
      <p>Conditions</p>
      <p>Feels Like: {parameters.main}</p>
      <p>Humidity: {parameters.humidity} %</p>
      <p>Wind: {parameters.wind} km/h</p>

      <form>
      <input type="text" placeholder="Search Locations..." value={input} onChange={(e) => setInput(e.target.value)} autoFocus/>
        <button type="submit" onClick={handleSubmit}><AiOutlineSearch /></button>
      </form>

    </div>
  );
};

export default Weather;
