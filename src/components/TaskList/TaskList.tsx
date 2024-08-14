import { IonIcon, IonList, IonText } from '@ionic/react';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { SavedTask } from '../../types/interfaces';
import TaskListItem from './TaskListItem';
import TaskListItemGroup from './TaskListItemGroup';
import { addCircle } from 'ionicons/icons';

interface TaskListProps {
    data: SavedTask[];
    showToast: (msg: string) => void;
    onUpdate: () => void;
    message?: string | JSX.Element;
}

const DefaultNotFoundMessage = () => (
    <>
        <IonText style={{ display: "block", marginBottom: 8 }}>
            No tasks to be found!
        </IonText>
        <IonText>
            Create a new one by<br/>pressing the
            <IonIcon icon={addCircle} style={{ verticalAlign: "middle", margin: "0 4px" }} />
            icon
        </IonText>
    </>
)

const TaskList: React.FC<TaskListProps> = (props) => {
    const [mappedTasks, setMappedTasks] = useState<Record<string, SavedTask[]>>({});

    useEffect(() => {
        const tempMappedTasks: typeof mappedTasks = {};
        for(const task of props.data) {
            const date = dayjs(task.date ?? new Date()).format("YYYY-MM-DD");
            if(tempMappedTasks[date] === undefined)
                tempMappedTasks[date] = [];
            tempMappedTasks[date].push(task);
        }
        setMappedTasks(tempMappedTasks);
        
    }, [props.data]);


    function displayNotFoundMessage() {
        if(typeof props.message == "string")
            return <IonText>{props.message}</IonText>;
        else if(props.message != undefined)
            return props.message;
        return <DefaultNotFoundMessage />;
    }

    return (
        <>
        <IonList>
            {
                Object.entries(mappedTasks).map(([date, tasks]) => {
                    const label = dayjs().isAfter(date, "day") ? "Overdue" : dayjs(date).format("MMM D • dddd");
                    return (
                        <TaskListItemGroup label={label} key={label}>
                            {
                                tasks.map(task => (
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
                        </TaskListItemGroup>
                    )
                })
            }
        </IonList>

        {
            Object.keys(mappedTasks).length == 0 &&
            <div className='ion-text-center ion-padding' style={{ fontSize: 20, color: "#272a2f", fontWeight: 600 }}>
                {displayNotFoundMessage()}
            </div>
            
        }
        </>
    )
}

export default TaskList