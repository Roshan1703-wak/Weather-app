import React, { useEffect, useState } from "react";
import "./style.css"


const Temp = () => {

    const[city,setCity] = useState(null);
    const [search, setSearch]=useState("mumbai");

    useEffect( () => {
        const fetchAPI= async() => {
            const API_key ="250ba8a3343a88b9d4cc6adfc1754dac";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}&units=metric`;
            
            const response = await fetch(url);
    
                const resjson = await response.json();
                 console.log(resjson);
                setCity(resjson.main);
        } 
        fetchAPI();
    },[search])
    return(
        <>
        
        <div className="box">
      <div className="weather">
      <h1>weather</h1></div> 
            <div className="inputData">
                <input 
                type="search"
                className="inputFeild"
                onChange={(event)=>{
                        setSearch(event.target.value)
                }}/>
            </div><br/>
    {!city ? ( <p>No Data found!...</p>):
    (
        <div>
        <div className="info">
            <h2 className="location"></h2>
           <div className="icon"> <i className="fa fa-street-view" aria-hidden="true">{search}</i></div><br/>
            <h1 className="temp">
                {city.Temp} *cel
            </h1>
            <h3 className="tempmin_max">min : {city.temp_min} *cel |Max : {city.temp_max}*cel</h3>
        </div>
        <div className="wave -one"></div>
        <div className="wave -ontwo"></div>
        <div className="wave -tree"></div>
        </div>

    )

    }       
       
       
        </div>
        </>
    );
};
export default Temp;