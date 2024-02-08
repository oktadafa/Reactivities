import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ducks } from './demo'
import axios from 'axios'
import { Header } from 'semantic-ui-react'

function App() {
const [activities, setActivities] = useState([]);
useEffect(() => {
  axios.get("http://localhost:5000/api/activities").then(response => setActivities(response.data));
},[])
console.log(activities);

  return (
    <>
      <Header icon={"blind"} content="Reactivity" as={"h2"}/>
    <ul>
    {activities.map((activity:any) => (
      <li key={activity.id}>
          {activity.title}
      </li>
    ))}
    </ul>
    </> 
  )
}

export default App
