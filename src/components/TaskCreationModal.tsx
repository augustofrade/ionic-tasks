import { IonButton, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';

import DatePicker from './DatePicker';
import { alarmOutline, calendarOutline, chevronForwardOutline, heart } from 'ionicons/icons';
import TimePicker from './TimePicker';

interface TaskCreationProps {
    modalRef: React.RefObject<HTMLIonModalElement>;
}

const TaskCreationModal: React.FC<TaskCreationProps> = (props) => {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    
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

                <div className='ion-margin-bottom'>
                   <DatePicker date={date} setDate={setDate} />
                </div>
                <TimePicker time={time} setTime={setTime} label={"Reminder"} disabled={date == null} />

                <div style={{ textAlign: "right" }}>
                    <IonButton>
                        <IonIcon slot="end" icon={chevronForwardOutline}></IonIcon>
                        Save
                    </IonButton>
                </div>

            </IonContent>
        </IonModal>
    )
}

export default TaskCreationModal;