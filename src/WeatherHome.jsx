import { useEffect, useState } from "react";

const WeatherHome = () => {
  let [weatherList, setWeatherList] = useState([]);
  let [weatherDetails, setWeatherDetails] = useState(null);
  let getWeatherDetails = async (event) => {
    let value = event.target.value;
    if (event.keyCode === 13 && value !== "") {
      let isFound = weatherList.findIndex((details) => {
        return details.name.toLowerCase() === value.toLowerCase();
      });

      let city = value;
      let API_KEY = "250ba8a3343a88b9d4cc6adfc1754dac";
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      switch (Number(data.cod)) {
        case 404:
          alert("City Not Found");
          setWeatherDetails(null);
          break;

        case 200:
          setWeatherDetails(data);
          if (isFound === -1)
            setWeatherList([...weatherList, { ...data }]); // adding in list
          else {
            weatherList[isFound] = { ...data };
            setWeatherList([...weatherList]);
          }
          break;

        default:
          alert("something went wrong, try again");
          setWeatherDetails(null);
          break;
      }
    }
  };
  useEffect(() => {
    //getWeatherDetails();
  }, []);
  return (
    <>
      <input type="text" onKeyUp={getWeatherDetails} />
      <hr />
      {weatherDetails ? (
        <div>
          <p>
            City:{weatherDetails.name} ({weatherDetails.sys.country})
          </p>
          <p>Min Temp:{weatherDetails.main.temp_min} deg/cel</p>
          <p>Max Temp:{weatherDetails.main.temp_max} deg/cel</p>
        </div>
      ) : null}
    </>
  );
};

export default WeatherHome;