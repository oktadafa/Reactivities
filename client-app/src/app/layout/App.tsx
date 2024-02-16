import {  useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

function App() {
const {activityStore} = useStore()
useEffect(() => {
  activityStore.loadingActivies();
},[activityStore])


if(activityStore.loadingInitial) return <LoadingComponent content='App Loading..'/>
  return (
    <>
      <Navbar/>
      <Container style={{marginTop:"7em"}}>
       <Outlet/>
    </Container>
    </> 
  )
}

export default observer(App) 
