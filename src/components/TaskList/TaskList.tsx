import { IonList } from '@ionic/react';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { SavedTask } from '../../types/interfaces';
import TaskListItem from './TaskListItem';
import TaskListItemGroup from './TaskListItemGroup';

interface TaskListProps {
    data: SavedTask[];
    showToast: (msg: string) => void;
    onUpdate: () => void;
}

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

  return (
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
  )
}

export default TaskList