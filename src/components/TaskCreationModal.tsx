import {
    IonButton,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonModal,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { chevronForwardOutline, flagOutline } from 'ionicons/icons';
import React, { useState } from 'react';

import { StorageHandler } from '../api/StorageHandler';
import { Priority } from '../types/enums';
import { Task } from '../types/interfaces';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

interface TaskCreationProps {
    modalRef: React.RefObject<HTMLIonModalElement>;
    onSuccess(): void;
    onError(): void;
}

const TaskCreationModal: React.FC<TaskCreationProps> = (props) => {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [priority, setPriority] = useState<Priority | null>(null);

    function onSubmitSuccess() {
        props.onSuccess();
        props.modalRef.current?.dismiss();
    }

    function handleSubmit() {
        // TODO: add form validation
        const taskInfo: Task = {
            title: title!,
            description: description!
        };
        if(date) {
            const dateObj = new Date(date);
            dateObj.setHours(0, 0, 0, 0);
            taskInfo.date = dateObj.toISOString();
            if(time) {
                const timeObj = new Date(time);
                dateObj.setHours(timeObj.getHours(), timeObj.getMinutes(), 0, 0);
                taskInfo.reminder = {
                    enabled: true,
                    date: dateObj.toISOString()
                };
            }
        }
        if(priority) taskInfo.priority = priority;

        StorageHandler.instance().set(new Date(), taskInfo)
        .then(onSubmitSuccess)
        .catch(err => props.onError());
    }
    
    return (
        <IonModal ref={props.modalRef} trigger="open-taskcreation-modal" initialBreakpoint={0.9} breakpoints={[ 0, 0.25, 0.5, 0.75, 0.9 ]}>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                <IonTitle>New Task</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonInput
                    label="Task title"
                    labelPlacement="floating"
                    autofocus={true}
                    required={true}
                    className="ion-margin-bottom"
                    value={title}
                    onIonChange={(e) => setTitle(e.detail.value as string)}
                >

                </IonInput>
                
                <IonTextarea
                    label="Description"
                    labelPlacement="floating"
                    autoGrow={true}
                    required={true}
                    className="ion-margin-bottom"
                    value={description}
                    onIonChange={(e) => setDescription(e.detail.value as string)}
                    
                >
                
                </IonTextarea>

                <div className='ion-margin-bottom'>
                    <DatePicker date={date} setDate={setDate} />
                    <TimePicker time={time} setTime={setTime} label={"Reminder"} disabled={date == null} />
                </div>

                <IonChip outline={true}>
                    <IonIcon icon={flagOutline} />
                    <IonSelect
                        interface="popover"
                        placeholder="No priority"
                        value={priority}
                        onIonChange={(e) => setPriority(e.detail.value)}
                    >
                        {
                            Object.entries(Priority).map(([k, v]) => ( <IonSelectOption key={k} value={k}>{v}</IonSelectOption> ))
                        }
                    </IonSelect>
                </IonChip>

                {
                    //TODO: add labels selection
                }


                <div style={{ textAlign: "right" }}>
                    <IonButton onClick={handleSubmit}>
                        <IonIcon slot="end" icon={chevronForwardOutline}></IonIcon>
                        Save
                    </IonButton>
                </div>

            </IonContent>
        </IonModal>
    )
}

export default TaskCreationModal;