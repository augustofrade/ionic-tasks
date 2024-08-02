import { IonContent, IonHeader, IonInput, IonModal, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

import DatePicker from './DatePicker';

interface TaskCreationProps {
    modalRef: React.RefObject<HTMLIonModalElement>;
}

const TaskCreationModal: React.FC<TaskCreationProps> = (props) => {
    
    return (
        <IonModal ref={props.modalRef} trigger="open-taskcreation-modal" initialBreakpoint={0.5} breakpoints={[ 0.25, 0.5 ]}>
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
        </IonModal>
    )
}

export default TaskCreationModal;