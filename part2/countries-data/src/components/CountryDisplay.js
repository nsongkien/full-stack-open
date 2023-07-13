import axios from 'axios'
import {useEffect,useState} from 'react'
import '../index.css'


const CountryDisplay = ({selectShow}) => {
    const [countryData,setCountryData] =useState(null)
    const [countryWeather,setCountryWeather] = useState(null)
    const api_key=process.env.REACT_APP_SECRET
    

    useEffect(()=>{
        if (selectShow!==''){
            axios 
                .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selectShow}`)
                .then(response=>{
                    setCountryData(response.data)
                })
            
            axios
                .get(`http://api.openweathermap.org/geo/1.0/direct?q=${selectShow}&limit=1&appid=${api_key}`)
                .then(response=>{
                    const countryLat=response.data[0].lat
                    const countryLon=response.data[0].lon
                    axios
                        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${countryLat}&lon=${countryLon}&appid=${api_key}`)
                        .then(response=>{
                            const countryRawData=(response.data)
                            const newWeatherObject = {
                                temp:countryRawData.main.temp,
                                pic:`https://openweathermap.org/img/wn/${countryRawData.weather[0].icon}@2x.png`,
                                windSpeed:countryRawData.wind.speed
                            }

                            setCountryWeather(newWeatherObject)
                        })
                })
        }
    },[selectShow])
    if(countryData!==null && countryWeather &&selectShow!==''){
        let countryLanguages= Object.values(countryData.languages)
        return (
            <>
                <h2>{countryData.name.common}</h2>
                <p>
                    capital {countryData.capital} <br/>
                    area {countryData.area}
                </p>
                <h3>languages:</h3>
                <ul>
                    {countryLanguages.map(language=><li key={language}>{language}</li>)}
                </ul>
                <div className='flag'>{countryData.flag}</div>
                <div>
                    <h2>Weather in {selectShow}</h2>
                    temperature {Math.round((countryWeather.temp-273.15)*100)/100} Celcius
                    <img src={countryWeather.pic}></img> <br/>
                    wind {countryWeather.windSpeed} m/s
                </div>
            </>
            )
    } else return null
     
  }

export default CountryDisplay