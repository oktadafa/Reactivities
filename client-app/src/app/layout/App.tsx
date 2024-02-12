import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Header, List } from 'semantic-ui-react'
import { Activity } from '../models/activities';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
const [activities, setActivities] = useState<Activity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
const [editModal, setEditModal] = useState(false);

useEffect(() => {
  axios.get<Activity[]>("http://localhost:5000/api/activities").then(response => setActivities(response.data));
},[])
console.log(activities);

const handleSelectActivity  =  (id:String) => {
  setSelectedActivity(activities.find(x => x.id === id))
}

const handleCancelSelectActivity = () => {
  setSelectedActivity(undefined);
}

const handleFormOpen = (id? : string) =>
{
  id ? handleSelectActivity(id) : handleCancelSelectActivity();
  setEditModal(true)
}

const handleFormClose = () => {
  setEditModal(false)
}

const handleCreateOrUpdate  = (activitiy:Activity) => {
  activitiy.id ? setActivities([...activities.filter(a => a.id !== activitiy.id), activitiy]) : setActivities([...activities, {...activitiy, id : uuid()}]);
setEditModal(false);
setSelectedActivity(activitiy);
}

const handleDeleteActivity = (id:string) => {
  setActivities([...activities.filter(i => i.id !== id)]);
}
  return (
    <>
      <Navbar openForm={handleFormOpen}/>
      <Container style={{marginTop:"7em"}}>
        <ActivityDashboard activities={activities} selectedActivity={selectedActivity} selectActivity={handleSelectActivity} cancelSelectActivity={handleCancelSelectActivity} editModal={editModal} openForm={handleFormOpen} closeForm={handleFormClose} createOrUpdate={handleCreateOrUpdate} handleDelete={handleDeleteActivity}/>
    </Container>
    </> 
  )
}

export default App
