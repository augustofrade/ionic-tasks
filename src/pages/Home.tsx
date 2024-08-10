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
import { trash } from 'ionicons/icons';
import TaskListItem from '../components/TaskListItem';

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
    .catch(err => console.log(err));
  }

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    setTasks(event.detail.complete(tasks));

    event.detail.complete();
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

        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
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
                  showToast={showToast}
                  onUpdate={fetchTasks}
                />
              ))
            }
          </IonReorderGroup>
        </IonList>

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
