import React from 'react';

import Titles from "./Components/Titles";
import Form from "./Components/Form";
import Weather from "./Components/Weather";

const API_KEY = "050210a1a2f874900dec2139fa03785f";

class App extends React.Component{
  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    windSpeed: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metrc`);
    const data = await api_call.json();
    if (city && country){
      console.log(data);
      this.setState  ({
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        error: ""
      });
    }else{
      this.setState ({
        city: undefined,
        country: undefined,
        temperature: undefined,
        humidity: undefined,
        windSpeed: undefined,
        description: undefined,
        error: "Please enter your city and country"
      });
    }
  }


render(){
  return(
    <div>
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Titles />
              </div>
              <div className="col-xs-7 form-container">
                <Form getWeather={ this.getWeather }/>
                <Weather
                  city= { this.state.city }
                  country={ this.state.country }
                  temperature={ this.state.temperature }
                  humidity= { this.state.humidity }
                  windSpeed= { this.state.windSpeed }
                  description= { this.state.description }
                  error= { this.state.error }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
};


export default App;
