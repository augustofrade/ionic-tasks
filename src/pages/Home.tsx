import './Home.css';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { useRef, useState } from 'react';

import NewTaskFAB from '../components/NewTaskFAB';
import TaskCreationModal from '../components/TaskCreationModal';
import TaskList from '../components/TaskList/TaskList';
import { SavedTask } from '../types/interfaces';
import { TaskService } from '../services/TaskService';

const Home: React.FC = () => {

  const [presentToast] = useIonToast();
  const showToast = (message: string) => {
    presentToast({
      duration: 2500,
      position: "bottom",
      message: message
    })
  }

  const taskCreationModal = useRef<HTMLIonModalElement>(null);

  const [tasks, setTasks] = useState<SavedTask[]>([]);
  useIonViewWillEnter(() => {
    fetchTasks();
  }, []);

  function fetchTasks() {
    TaskService.instance().getAllFromToday()
    .then(res => {
      setTasks(res.reverse());
    })
    .catch(err => showToast("An error occured while loading tasks"));
  }

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

        <NewTaskFAB />

        <TaskList
          data={tasks}
          onUpdate={fetchTasks}
          showToast={showToast}
        />

        <TaskCreationModal
            modalRef={taskCreationModal}
            onSuccess={() => {
              showToast("Task saved successfully!");
              fetchTasks();
            }}
            onError={() => {
              showToast("Error while saving task")
            }}
          />

      </IonContent>
    </IonPage>
  );
};

export default Home;
