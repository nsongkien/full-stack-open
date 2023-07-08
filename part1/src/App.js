const Header= ({course}) => {
  
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Content= ({course}) => {
  return (
    <>
     <Part name={course.parts[0].name} exercises={course.parts[0].exercises}/>
     <Part name={course.parts[1].name} exercises={course.parts[1].exercises}/>
     <Part name={course.parts[2].name} exercises={course.parts[2].exercises}/>
    </>
  )
}

const Part = ({name,exercises})=> {
  return (
    <>
      <p>
        {name}: {exercises} exercises
      </p>
    </>
  )
}

const Total= ({exercises}) => {
  return (
    <p>
      The course have {exercises[0]+exercises[1]+exercises[2]} exercises in total
    </p>
  )
}
const App = () => {
  // const-definitions

  const course = {
    name:  'Half Stack application developmemnt',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  

  return (
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total exercises={course.parts.map(part=>part.exercises)}/>
    </>
  )
}

export default App