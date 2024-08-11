import React from 'react'
import { SavedTask } from '../types/interfaces'
import { IonList, IonReorderGroup, ItemReorderEventDetail } from '@ionic/react';
import TaskListItem from './TaskListItem';

interface TaskListProps {
    data: SavedTask[];
    showToast: (msg: string) => void;
    onUpdate: () => void;
    onItemReorder: (event: CustomEvent<ItemReorderEventDetail>) => void;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  return (
    <IonList>
        <IonReorderGroup disabled={false} onIonItemReorder={props.onItemReorder}>
        {
            props.data.map(task => (
                <TaskListItem
                    task={{
                        id: task.id,
                        title: task.title,
                        reminder: task.reminder,
                        date: task.date
                    }}
                    key={task.id}
                    showToast={props.showToast}
                    onUpdate={props.onUpdate}
                />
            ))
        }
        </IonReorderGroup>
    </IonList>
  )
}

export default TaskList