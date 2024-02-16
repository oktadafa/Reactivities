import React from 'react'
import { Card, Image, CardContent, CardHeader, CardMeta,CardDescription,Icon, ButtonGroup, Button} from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
export default function ActivityDetails() {
  
  const {activityStore} = useStore()
  const {activity} = activityStore
  
  if(!activity) return <LoadingComponent/>
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
            <Button basic color='blue' content="Edit" onClick={() => activityStore.openForm(activity.id)}/>
            <Button basic color='grey' content='Cancel' onClick={() => activityStore.cancelSelectActivity()}/>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
