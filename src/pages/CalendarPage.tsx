import {
    IonContent,
    IonDatetime,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonToast,
    useIonViewWillEnter,
} from '@ionic/react';
import dayjs from 'dayjs';

import TaskList from '../components/TaskList/TaskList';
import useTaskFetcher from '../hooks/useTaskFetcher';

const CalendarPage = () => {
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

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>                    
                    <IonTitle>Calendar</IonTitle>
                </IonToolbar>
                <IonDatetime
                    size="cover"
                    presentation="date"
                    min={new Date().toISOString()} max={dayjs().add(1, "year").toISOString()}
                    style={{ position: "sticky" }}
                >    
                </IonDatetime>
            </IonHeader>

            <IonContent>
                <TaskList
                    data={tasks}
                    onUpdate={fetchTasks}
                    showToast={showToast}
                />
            </IonContent>
        </IonPage>
    )
}

export default CalendarPage