import React from 'react'
import { Card, Image, CardContent, CardHeader, CardMeta,CardDescription,Icon, ButtonGroup, Button} from 'semantic-ui-react';
import { Activity } from '../../../app/models/activities';
interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}
export default function ActivityDetails({activity,cancelSelectActivity,openForm}: Props) {
  return (
    <Card>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span className="date">{activity.date}</span>
        </CardMeta>
        <CardDescription>
            {activity.description}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <ButtonGroup widths='2'>
            <Button basic color='blue' content="Edit" onClick={() => openForm(activity.id)}/>
            <Button basic color='grey' content='Cancel' onClick={cancelSelectActivity}/>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
