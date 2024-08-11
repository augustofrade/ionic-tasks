import './Home.css';

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToast,
  IonToolbar,
  ItemReorderEventDetail,
  useIonAlert,
  useIonToast,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';

import NewTaskFAB from '../components/NewTaskFAB';
import TaskCreationModal from '../components/TaskCreationModal';
import { SavedTask } from '../types/interfaces';
import { StorageHandler } from '../api/StorageHandler';
import TaskList from '../components/TaskList/TaskList';

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
  useEffect(() => {
    fetchTasks();
  }, []);

  function fetchTasks() {
    StorageHandler.instance().getAllFromToday()
    .then(res => {
      setTasks(res);
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
