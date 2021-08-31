import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import "./clock.js";
import {Icon} from 'semantic-ui-react';

const App = () => {
  const [temperature, setTemperature] = useState("");
  const [city, setCity] = useState("Istanbul");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [windspeed, setWineSpeed] = useState("");
  const [wicon, setWicon] = useState("");
  const getWeatherData = () => {
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=putyourapihere`,
    })
      .then((response) => {
        setTemperature(Math.round(response.data.main.temp - 273.15));
        setDesc(response.data.weather[0].description);
        setName(response.data.name);
        setHumidity(response.data.main.humidity);
        setVisibility(response.data.visibility / 1000);
        setWineSpeed(response.data.wind.speed);
        setWicon(response.data.weather[0].icon);
        console.log(response);
      })
      .catch((error) => {});
  };

  return (
    <div className="background">
      <div className="container">
        <form id="content" autoComplete="off">
          <input
            type="text"
            name="input"
            className="Search-box"
            onChange={(e) => setCity(e.target.value)}
          />
          <span></span>
        </form>
        <button 
          className="searchbtn"
          onClick={() => {
            getWeatherData(city);
          }}
        >
          Search
        </button>
        <div id="card" className="weather">
          <div className="details">
            <div className="temp">
              {temperature}
              <span>c</span>
            </div>
            <div className="right">
              <div id="summary">{desc}</div>
              <div>{name}</div>
              <div>Humidity {humidity}%</div>
              <div>Visibility {visibility}km</div>
              <div>Wind Speed {windspeed}km</div>
              <img
                alt="image"
                src={`http://127.0.0.1:5500/src/${wicon}.png`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
/* <div>
    <div>
      {city} Weather <span></span>Temp {temperature} - {desc}
      <br/>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} ></input>
      <button onClick={() => {getWeatherData(city)}}>GET</button>
    </div>
  </div> */
