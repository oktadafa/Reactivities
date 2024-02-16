import { Grid, GridColumn } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activities';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


export default observer(function ActivityDashboard() {
  const {activityStore} = useStore()
  const {editModal,activity:selectedActivity} = activityStore
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList/>
      </Grid.Column>
      <GridColumn width="6">
        {selectedActivity && !editModal &&(
          <ActivityDetails
          />
        )}
        {editModal && (
          <ActivityForm  />
        )}
      </GridColumn>
    </Grid>
  );
}) 
