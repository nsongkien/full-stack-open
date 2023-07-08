import { useState } from 'react';

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>
    {text}
  </button>
);

const Statistics = ({ stats }) => {
  if (stats.total === 0) {
    return <p>No feedback given</p> 
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={stats.good}/>
          <StatisticLine text="neutral" value={stats.neutral} />
          <StatisticLine text="bad" value ={stats.bad} />
          <StatisticLine text="total" value={stats.total}/>
          <StatisticLine text="average" value={stats.average}/>    
        </tbody>
      </table>
      
    </>
  )
}

const StatisticLine = ({text, value}) => {
  if (text==="average") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td> 
      </tr>
    )
  }
  else return (
    <tr>
      <td>{text}</td>
      <td>{value}</td> 
    </tr>
    )
}

const App = () => {
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    average: 0,
  });

  const handleButtonClick = (type) => {
    let updatedStats = {
      ...stats,
      [type]: stats[type] + 1,
      total: stats.total + 1,
    }
    updatedStats={
      ...updatedStats,
      average: ((updatedStats.good-updatedStats.bad)/updatedStats.total*100)
    }
    setStats(updatedStats);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" clickHandler={() => handleButtonClick('good')} />
      <Button text="neutral" clickHandler={() => handleButtonClick('neutral')} />
      <Button text="bad" clickHandler={() => handleButtonClick('bad')} />
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
