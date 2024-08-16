import {
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonToast,
    useIonViewWillEnter,
} from '@ionic/react';
import dayjs from 'dayjs';

import TaskList from '../components/TaskList/TaskList';
import useTaskFetcher from '../hooks/useTaskFetcher';
import { useState } from 'react';
import { refreshOutline } from 'ionicons/icons';
import NewTaskFAB from '../components/NewTaskFAB';

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const { tasks, fetchTasks } = useTaskFetcher();

    const [presentToast] = useIonToast();
    const showToast = (message: string) => {
        presentToast({
        duration: 2500,
        position: "bottom",
        message: message
        })
    }

    useIonViewWillEnter(() => {
        fetchTasks();
    });

    function fetchTasksByDate(val: string | null) {
        if(val == null) {
            fetchTasks();
        } else {
            fetchTasks({
                date: (date) => dayjs(date).isSame(val, "day")
            });
        }
    }

    function handleDateSelection(val: string | null) {
        setSelectedDate(val);
        fetchTasksByDate(val)
    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>                    
                    <IonTitle>Calendar</IonTitle>
                    {
                    selectedDate &&
                    <IonButtons slot="end">
                        <IonButton shape="round" onClick={() => handleDateSelection(null)}>
                            <IonIcon icon={refreshOutline} />
                        </IonButton>
                    </IonButtons>
                    }
                </IonToolbar>
                <IonDatetime
                    size="cover"
                    presentation="date"
                    min={dayjs().subtract(1, "day").toISOString()}
                    max={dayjs().add(1, "year").toISOString()}
                    style={{ position: "sticky" }}
                    value={selectedDate}
                    onIonChange={e => handleDateSelection(e.target.value as string)}
                >
                </IonDatetime>
            </IonHeader>

            <IonContent>
                <TaskList
                    data={tasks}
                    onUpdate={() => fetchTasksByDate(selectedDate)}
                    showToast={showToast}
                    message={"No tasks found for the selected date"}
                />

                <NewTaskFAB
                    showToast={showToast}
                    fetchTasks={() => fetchTasksByDate(selectedDate)}
                />
            </IonContent>
        </IonPage>
    )
}

export default CalendarPage