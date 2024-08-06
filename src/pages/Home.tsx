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

const Home: React.FC = () => {

  const [presentToast] = useIonToast();
  const showToast = (message: string) => {
    presentToast({
      duration: 2500,
      position: "bottom",
      message: message
    })
  }

  const [presentAlert] = useIonAlert();

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

  function handleDeleteTask(id: string) {
    StorageHandler.instance().remove(id)
    .then(res => {
      showToast("Task deleted successfully");
      fetchTasks();
    })
    .catch(err => {
      showToast("An error occured while trying to delete this task")
    });
  }

  function onDeleteTask(id: string) {
    presentAlert({
      header: "Warning",
      message: "Are you sure you want to delete this task?",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Delete",
          handler: () => handleDeleteTask(id)
        }
      ]
    });
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
                <IonItemSliding key={task.id}>
                  <IonItem routerLink={`/task/${task.id}`}>
                    <IonLabel>{ task.title }</IonLabel>
                    <IonReorder slot="end"></IonReorder>
                  </IonItem>

                  <IonItemOptions>
                    <IonItemOption color="danger" onClick={() => onDeleteTask(task.id)}>
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
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
