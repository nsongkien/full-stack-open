const Header= ({course}) => {
  
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content= ({part1, part2, part3}) => {
  return (
    <>
     <Part part={part1.part} exercise={part1.exercise}/>
     <Part part={part2.part} exercise={part2.exercise}/>
     <Part part={part3.part} exercise={part3.exercise}/>
    </>
  )
}

const Part = ({part,exercise})=> {
  return (
    <>
      <p>
        {part}: {exercise} exercises
      </p>
    </>
  )
}

const Total= ({totalExercises}) => {
  return (
    <p>
      The course have {totalExercises} exercises in total
    </p>
  )
}
const App = () => {
  // const-definitions
  const course = 'Half Stack application development'
  const part1 = { part: 'Fundamentals of React', exercise: 10 };
  const part2 = { part: 'Using props to pass data', exercise: 7 };
  const part3 = { part: 'State of a component', exercise: 14 };

  return (
    <>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total totalExercises={part1.exercise+part2.exercise+part3.exercise}/>
    </>
  )
}

export default App