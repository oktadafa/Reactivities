import  { useState } from 'react'
import { Activity } from '../../../app/models/activities'
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  handleDelete: (id:string) => void;
  submitting: boolean;
}

export default function ActivityList({activities, selectActivity, handleDelete, submitting} : Props) {
const [target,setTarget] = useState('');

const handleActivityDelete = (e:any, id:string) => {
    setTarget(e.target.name)
    handleDelete(id)
}
    return (
    <Segment>
        <Item.Group divided>
            {activities.map(activity => (
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>
                                {activity.description}
                            </div>
                            <div>
                                {activity.city}, {activity.venue}
                            </div>
                        </Item.Description>
                        <Item.Extra>
                            <Button floated='right' content="View" color='blue' onClick={() => selectActivity(activity.id)}/>
                            <Button loading={submitting && target == activity.id} floated='right' content="Delete" name={activity.id} color='red' onClick={(e) => handleActivityDelete(e, activity.id)}/>
                            <Label basic content={activity.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    </Segment>
  )
}
