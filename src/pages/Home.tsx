import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonReorder, IonReorderGroup, IonTitle, IonToolbar, ItemReorderEventDetail } from '@ionic/react';
import './Home.css';
import { useState } from 'react';
import { Task } from '../types/interfaces';

const Home: React.FC = () => {

  // TODO: fetch tasks from storage
  const [tasks, setTasks] = useState<Task[]>([
    {
      title: "1 - Do the dishes",
      description: "Do the dishes asap b4 family gets home"
    },
    {
      title: "2 - Create a pixel art",
      description: "Create a pixel art and sent to friend"
    },
    {
      title: "3 - Develop app",
      description: "Develop the tasks app"
    }
  ]);

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    setTasks(event.detail.complete(tasks));

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  return (
    <IonPage>
      <IonHeader>
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

        <IonList>
          {/* The reorder gesture is disabled by default, enable it to drag and drop items */}
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

      </IonContent>
    </IonPage>
  );
};

export default Home;
