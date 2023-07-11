import { useState,useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import PersonsDisplay from './components/PersonsDisplay'
import Filter from './components/Filter'
import personsServices from './services/persons'


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
  const handleDelete=(id)=>{
    setPersons(persons.filter(person=>person.id!==id))
  }
  const handleAddClick = (event) => {
    event.preventDefault()
    if (persons.find(person=>newName===person.name)){
      const foundPerson=persons.find(person=>newName===person.name)
      if (window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        const newPersonObject = {
          ...foundPerson,
          phone: newPhone,
        }
        return (
          personsServices
            .update(foundPerson.id, newPersonObject)
            .then(() => {
              setPersons(persons.map((person) =>
                person.id === newPersonObject.id ? newPersonObject : person
              ))
              setNewName('')
              setNewPhone('')
            })
        )    
      } 
      else return
    }
    
    const newPersonObject = {
      name: newName,
      phone: newPhone,
    }
    personsServices
      .create(newPersonObject)
      .then(response=>{
        setPersons(persons.concat(response))
        setNewName('')
        setNewPhone('')
      })

    
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

      <PersonsDisplay 
        persons={persons} 
        filter={filter}
        handleDelete={handleDelete}/>
    </div>
  )
}

export default App