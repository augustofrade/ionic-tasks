import './index.css';

import { IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import DatePicker from '../../components/DatePicker';

interface Props { }

const TaskCreation: React.FC<Props> = () => {
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                <IonTitle>New Task</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonInput
                    autofocus={true}
                    placeholder="Task title"
                    required={true}
                    className="ion-margin-bottom"
                >

                </IonInput>
                
                <IonTextarea
                    placeholder="Description"
                    autoGrow={true}
                    required={true}
                    className="ion-margin-bottom"
                >
                
                </IonTextarea>

                <div>
                    <IonText>
                        Due date
                    </IonText>
                    <DatePicker />
                </div>

            </IonContent>
        </IonPage>
    )
}

export default TaskCreation;