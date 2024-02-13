import { Grid, GridColumn } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activities';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
interface Props {
    activities : Activity[]
    selectedActivity : Activity | undefined;
    selectActivity : (id : string) => void;
    cancelSelectActivity : () => void;
    editModal : boolean;
    openForm : (id:string) => void;
    closeForm :  () => void;
    createOrUpdate : (activity:Activity) => void;
    handleDelete : (id:string) => void;
    submitting: boolean;
  }


export default function ActivityDashboard({activities, selectActivity,selectedActivity,cancelSelectActivity, openForm,closeForm,editModal,createOrUpdate, handleDelete, submitting} : Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} handleDelete={handleDelete} submitting={submitting}/>
      </Grid.Column>
      <GridColumn width="6">
        {selectedActivity && !editModal &&(
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editModal && (
          <ActivityForm createOrUpdate={createOrUpdate} closeForm={closeForm} submitting={submitting}activity={selectedActivity} />
        )}
      </GridColumn>
    </Grid>
  );
}
