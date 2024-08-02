import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

const NewTaskFAB: React.FC = () => {

    return (
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton id="open-taskcreation-modal">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    )
};

export default NewTaskFAB;