import './index.css';

import { IonContent, IonPage } from '@ionic/react';
import React from 'react';

interface Props { }

const TaskCreation: React.FC<Props> = () => {
    return (
        <IonPage>
            <IonContent>
                New task
            </IonContent>
        </IonPage>
    )
}

export default TaskCreation;