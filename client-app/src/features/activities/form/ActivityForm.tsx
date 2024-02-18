import  { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, FormInput, FormTextArea, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../app/models/activities';
import {v4 as uuid} from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {  updateActivity, createActivity, loadingUpdate, loadActivity, loadingInitial} = activityStore;
  const navigate = useNavigate()
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    venue: "",
    category: "",
    description: "",
    city: "",
    date: "",
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then(activity => setActivity(activity!))
    }
  },[])
  const {id} = useParams();
  const handleSubmit = () => {
    if (!activity.id) {
      activity.id =  uuid();
createActivity(activity).then(() => navigate(`/activities/${activity.id}`))  
    }else {
   updateActivity(activity).then(() => navigate(`/activities/${activity.id}`)); 
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(value);
    
    setActivity({ ...activity, [name]: value });
  };

if (loadingInitial) {
  <LoadingComponent content='Loading App..'/>
}
  
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <FormInput
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleChange}
        />
        <FormTextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleChange}
        />
        <FormInput
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleChange}
        />
        <FormInput
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleChange}
        />
        <FormInput
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleChange}
        />
        <FormInput
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleChange}
        />        
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={loadingUpdate}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          as={Link}
          to={"/activities"}
        />
      </Form>
    </Segment>
  );
}); 