import { useEffect, useState } from 'react'
import { Button, Container } from 'semantic-ui-react'
import { Activity } from '../models/activities';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import { agent } from '../api/agen';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
const [activities, setActivities] = useState<Activity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
const [editModal, setEditModal] = useState(false);
const [loading, setLoading] = useState(true);
const [submitting, setSubmitting] = useState(false);
const {activityStore} = useStore()
useEffect(() => {
  agent.Activities.list().then(response => {
    let activities : Activity[] = [];
    response.forEach(activity => {
      activity.date = activity.date.split('T')[0];
      activities.push(activity);
    })
    setActivities(activities)
    setLoading(false)
  });
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
  setSubmitting(true)
  if (activitiy.id) {
    agent.Activities.update(activitiy).then(() =>  {
      setActivities([
        ...activities.filter((a) => a.id !== activitiy.id),
        activitiy,
      ]);
      setSelectedActivity(activitiy)
      setSubmitting(false)
      setEditModal(false);
    }).catch(err => {console.log(err); console.log(activitiy)}
    )
  }else{
    activitiy.id = uuid();
    agent.Activities.create(activitiy).then(() => {
      setActivities([...activities, activitiy])
         setSelectedActivity(activitiy);
        })
        setSubmitting(false);
        setEditModal(false);
  }
setEditModal(false);
setSelectedActivity(activitiy);
}

const handleDeleteActivity = (id:string) => {
  setSubmitting(true)
  agent.Activities.delete(id).then(() => {
    setActivities([...activities.filter(i => i.id !== id)]);
    setSubmitting(false)
  })
}
if(loading) return <LoadingComponent content='App Loading..'/>
  return (
    <>
      <Navbar openForm={handleFormOpen}/>
      <Container style={{marginTop:"7em"}}>
      <h2>{activityStore.title}</h2>
      <Button content="edit title!" positive  onClick={activityStore.setTitle}/>
        <ActivityDashboard activities={activities} selectedActivity={selectedActivity} selectActivity={handleSelectActivity} cancelSelectActivity={handleCancelSelectActivity} editModal={editModal} openForm={handleFormOpen} closeForm={handleFormClose} createOrUpdate={handleCreateOrUpdate} handleDelete={handleDeleteActivity} submitting={submitting}/>
    </Container>
    </> 
  )
}

export default observer(App); 
