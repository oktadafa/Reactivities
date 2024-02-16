import  { ChangeEvent, useState } from 'react'
import { Button, Form, FormField, FormInput, FormTextArea, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { activity: selecetedActivity, closeForm, updateActivity, createActivity, loadingUpdate } = activityStore;
  const InitialState = selecetedActivity ?? {
    id: "",
    title: "",
    venue: "",
    category: "",
    description: "",
    city: "",
    date: "",
  };
  const [activity, setActivity] = useState(InitialState);
  const handleSubmit = () => {
activity.id ? updateActivity(activity) : createActivity(activity)  
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };


  
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
          onClick={() => closeForm()}
        />
      </Form>
    </Segment>
  );
}); 