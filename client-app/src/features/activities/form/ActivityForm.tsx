import React, { ChangeEvent, useState } from 'react'
import { Button, Form, FormInput, FormTextArea, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activities';
interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  createOrUpdate: (activity: Activity) => void;
  submitting: boolean;
}
export default function ActivityForm({closeForm,createOrUpdate,submitting, activity:selecetedActivity} : Props) {
const InitialState = selecetedActivity ?? {
    id : '',
    title : '',
    venue: '',
    category:'',
    description:'',
    city: '',
    date:''
}
const [activity, setActivity] = useState(InitialState)
const handleSubmit = () => {
    console.log(activity);
    createOrUpdate(activity)
}    

const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setActivity({...activity, [name] : value})
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
      type='date'
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
      <Button floated="right" positive type="submit" content="Submit" loading={submitting}/>
      <Button
        floated="right"
        type="button"
        content="Cancel"
        onClick={() => closeForm()}
      />
    </Form>
  </Segment>
);
}
