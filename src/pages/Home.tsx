import './Home.css';

import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToast,
  IonToolbar,
  ItemReorderEventDetail,
  useIonToast,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';

import NewTaskFAB from '../components/NewTaskFAB';
import TaskCreationModal from '../components/TaskCreationModal';
import { Task, TaskItem } from '../types/interfaces';
import { StorageHandler } from '../api/StorageHandler';

const Home: React.FC = () => {

  const [present] = useIonToast();
  const showToast = (message: string) => {
    present({
      duration: 2500,
      position: "bottom",
      message: message
    })
  }

  const taskCreationModal = useRef<HTMLIonModalElement>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    StorageHandler.instance().getAllFromToday()
      .then(res => {
        const tempTasks: TaskItem[] = Object.entries(res).map(([id, taskInfo]) => ({
          id, ...taskInfo
        }));
        setTasks(tempTasks);
      })
      .catch(err => console.log(err));
  }, []);

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
              // TODO: change key to task ID
              tasks.map(task => (
                <IonItem key={task.title}>
                  <IonLabel>{ task.title }</IonLabel>
                  <IonReorder slot="end"></IonReorder>
                </IonItem>
              ))
            }
          </IonReorderGroup>
        </IonList>

        <TaskCreationModal showToast={showToast} modalRef={taskCreationModal} />

      </IonContent>
    </IonPage>
  );
};

export default Home;
