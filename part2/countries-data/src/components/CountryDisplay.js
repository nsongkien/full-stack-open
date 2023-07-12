import axios from 'axios'
import {useEffect,useState} from 'react'
import '../index.css'
const CountryDisplay = ({selectShow}) => {
    const [countryData,setCountryData] =useState(null)
    useEffect(()=>{
        if (selectShow!==''){
            axios 
                .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selectShow}`)
                .then(response=>{
                    setCountryData(response.data)
                })
            
        }
    },[selectShow])
    if(countryData!==null&&selectShow!==''){
        let countryLanguages= Object.values(countryData.languages)
        console.log(countryLanguages)

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
            </>
            )
    } else return null
     
  }

export default CountryDisplay