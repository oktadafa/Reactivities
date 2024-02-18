import {  useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/homePage';

function App() {
const {activityStore} = useStore()
const location = useLocation()
useEffect(() => {
  if (activityStore.activityREgistry.size <= 1) {
    activityStore.loadingActivies();
  }
},[activityStore.loadActivity, activityStore.activityREgistry.size])


if(activityStore.loadingInitial) return <LoadingComponent content='App Loading..'/>

if (location.pathname == "/") {
  return (<HomePage/>)
}else{

  return (
    <>
      <Navbar/>
      <Container style={{marginTop:"7em"}}>
       <Outlet/>
    </Container>
    </> 
  )
}
}

export default observer(App) 
