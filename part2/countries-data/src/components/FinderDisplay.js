const FinderDisplay = ({finder,finderNames,handleSelectShowButton}) => {
    if (finderNames.length>=10 && finder!=='') 
      return <p>Too many matches, please specify the filter</p>
    else if(finderNames.length>1&&finder!=='')
      return (
        <>
          {finderNames.map(name=><div key={name}>{name} <button value={name} onClick={handleSelectShowButton}>show</button></div>)}
        </>
      )
    else return
  }
 
export default FinderDisplay