const PersonsDisplay = ({persons,filter}) => {
    return (
      persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.phone}
          </div>
      ))
    )
  }

  export default PersonsDisplay