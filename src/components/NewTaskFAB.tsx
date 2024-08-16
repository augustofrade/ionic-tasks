import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useRef } from 'react';

import TaskCreationModal from './TaskCreationModal';

interface NewTaskFABProps {
  showToast(msg: string): void;
  fetchTasks(): any;
}

const NewTaskFAB: React.FC<NewTaskFABProps> = ({ showToast, fetchTasks }) => {
    const taskCreationModal = useRef<HTMLIonModalElement>(null);

    return (
      <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton id="open-taskcreation-modal">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>

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
      </>
    )
};

export default NewTaskFAB;