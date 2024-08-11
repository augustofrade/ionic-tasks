import { IonItemGroup, IonItemDivider, IonLabel } from '@ionic/react'
import React from 'react'

interface TaskListItemGroupProps {
    label: string;
    children: JSX.Element[] | JSX.Element;
}

const TaskListItemGroup: React.FC<TaskListItemGroupProps> = ({label, children}) => {
  return (
    <IonItemGroup>
        <IonItemDivider sticky={true}>
            <IonLabel color="dark"><b>{label}</b></IonLabel>
        </IonItemDivider>
        { children }
    </IonItemGroup>
  )
}

export default TaskListItemGroup