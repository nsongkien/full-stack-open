import { useState,useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import PersonsDisplay from './components/PersonsDisplay'
import Filter from './components/Filter'

const App = () => {
  const [persons,setPersons]=useState([])
  const [newName, setNewName] = useState('')
  const [newPhone,setNewPhone] =useState('')
  const [filter,setFilter]=useState('')

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response=>{
        setPersons(response.data)
      })
  },[])

  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase());
  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)

  const handleAddClick = (event) => {
    event.preventDefault()
    if (persons.find(person=>newName===person.name))
      return alert(`${newName} is already added to phonebook`)
    else if (persons.find(person=>newPhone===person.phone))
      return alert(`${newPhone} is somebody else's phone number`)
    
    const newPersonObject = {
      name: newName,
      phone: newPhone,
      id: persons.length+1
    }
    setPersons(persons.concat(newPersonObject))
    setNewName('')
    setNewPhone('')
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
      <h3>Add a new</h3>

      <PersonForm 
        handleNameChange={handleNameChange} 
        handlePhoneChange={handlePhoneChange} 
        handleAddClick={handleAddClick}
        newName={newName}
        newPhone={newPhone}
      />

      <h2>Numbers</h2>

      <PersonsDisplay persons={persons} filter={filter}/>
    </div>
  )
}

export default App