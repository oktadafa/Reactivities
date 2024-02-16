import  { useState } from 'react'
import { Button, Header, Item, Label, Modal, ModalActions, ModalContent, ModalHeader, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


export default observer(function ActivityList() {
  const [target, setTarget] = useState("");
    const [confirmBox, setConfirmBox] = useState({
      open: false,
      id: "",
    });
  const { activityStore } = useStore();
  const {laodinDelete, handleDelete} = activityStore
  const handleActivityDelete = (e: any, id: string) => {
    setTarget(e.target.name);
    setConfirmBox({
      open : true,
      id: id
    })
  };

  return (
    <Segment>
      <Item.Group divided>
        {activityStore.ActivitiesByDate.length > 0 ? (
          activityStore.ActivitiesByDate.map((activity) => (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    floated="right"
                    content="View"
                    color="blue"
                    onClick={() => activityStore.selectActivity(activity.id)}
                  />
                  <Button
                    loading={laodinDelete && target == activity.id}
                    floated="right"
                    content="Delete"
                    name={activity.id}
                    color="red"
                    onClick={(e) => {
                      handleActivityDelete(e, activity.id)
                     
                    }
                    }
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))
        ) : (
          <Header content="Not Found" as="h3" textAlign="center" />
        )}
      </Item.Group>

      <Modal size="small" open={confirmBox.open}>
        <ModalHeader>Delete Activity</ModalHeader>
        <ModalContent>Are You Sure Delete This Activity?</ModalContent>
        <ModalActions>
          <Button
            negative
            content="No"
            onClick={() => setConfirmBox({ open: false, id: "" })}
          />
          <Button
            positive
            content="Yes"
            onClick={() => {
              handleDelete(confirmBox.id);
              setConfirmBox({ open: false, id: "" });
            }}
          />
        </ModalActions>
      </Modal>
    </Segment>
  );
}); 