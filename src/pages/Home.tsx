import './Home.css';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonToast, useIonViewWillEnter } from '@ionic/react';

import NewTaskFAB from '../components/NewTaskFAB';
import TaskList from '../components/TaskList/TaskList';
import useTaskFetcher from '../hooks/useTaskFetcher';

const Home: React.FC = () => {

  const [presentToast] = useIonToast();
  const showToast = (message: string) => {
    presentToast({
      duration: 2500,
      position: "bottom",
      message: message
    })
  }

  const { tasks, fetchTasksFromToday } = useTaskFetcher();
  useIonViewWillEnter(() => {
    fetchTasksFromToday();
  }, []);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Today</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Today</IonTitle>
          </IonToolbar>
        </IonHeader>

        <NewTaskFAB
          showToast={showToast}
          fetchTasks={fetchTasksFromToday}
        />

        <TaskList
          data={tasks}
          onUpdate={fetchTasksFromToday}
          showToast={showToast}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
