import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone,setNewPhone] =useState('')
  const [filter,setFilter]=useState('')

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
      <p>filter shown with 
        <input 
          value={filter}
          onChange={handleFilterChange}
        />
      </p>
      <form onSubmit={handleAddClick}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
          phone: <input
            value={newPhone}
            onChange={handlePhoneChange}
          />
        <div>

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.phone}
          </div>
      ))}
    </div>
  )
}

export default App