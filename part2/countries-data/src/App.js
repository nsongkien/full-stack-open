import {useState,useEffect} from 'react'
import axios from 'axios'
import CountryDisplay from './components/CountryDisplay'
import Finder from './components/Finder'
import FinderDisplay from './components/FinderDisplay'


const App = () => {
  const [countriesNames,setCountriesNames]=useState([])
  const [finder,setFinder] = useState('')
  const [finderNames,setFinderNames]=useState([])
  const [selectShow,setSelectShow]=useState('')


  useEffect(()=>{
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response=>{
          setCountriesNames(response.data.map(
            country=>country.name.common))
      })
  },[])
  useEffect(()=>{
    if (finderNames.length===1) 
      setSelectShow(finderNames[0])
    else setSelectShow('')
  },[finderNames])
  const handleFinderChanges = (event) => {
    const value=event.target.value
    setFinder(value)
    setFinderNames(countriesNames.filter(country=>country.toLowerCase().includes(value.toLowerCase())))
  }
  const handleSelectShowButton = (event) => setSelectShow(event.target.value)


  return(
    <>
      <Finder 
        handleFinderChanges={handleFinderChanges}
        finder={finder}
      />
      <FinderDisplay 
        finderNames={finderNames} 
        handleSelectShowButton={handleSelectShowButton}
        finder={finder}
      />
      <CountryDisplay selectShow={selectShow}/>
    </>
  )}

export default App;
