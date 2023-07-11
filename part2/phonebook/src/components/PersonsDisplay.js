import personsServices from "../services/persons"

const PersonsDisplay = ({persons,filter,handleDelete}) => 
  persons
    .filter((person) => person.name.toLowerCase().includes(filter))
    .map((person) => (
      <div key={person.id}>
        {person.name} {person.phone} <button 
          onClick={()=>{
            if (window.confirm(`Delete ${person.name}?`))
            {
              personsServices.erase(person.id)
              handleDelete(person.id)
            }
        }}>delete</button>
      </div>
  ))


  export default PersonsDisplay