import '../css/autoHeightModal.css';
import '../css/horizontalList.css';

import { IonButton, IonHeader, IonIcon, IonInput, IonModal, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { save } from 'ionicons/icons';
import React, { useState } from 'react';

import { TaskService } from '../services/TaskService';
import { Priority } from '../types/enums';
import { Task } from '../types/interfaces';
import DatePicker from './DatePicker';
import PrioritySelect from './PrioritySelect';
import SectionDivider from './SectionDivider';
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

    function resetModal() {
        setTitle(undefined);
        setDescription(undefined);
        setDate(null);
        setTime(null);
        setPriority(null);
    }

    function onSubmitSuccess() {
        props.onSuccess();
        resetModal();
        props.modalRef.current?.dismiss();
    }

    function handleSubmit() {
        const taskInfo: Task = {
            title: title!.trim(),
            description: description
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

        TaskService.instance().create(taskInfo)
        .then(onSubmitSuccess)
        .catch(err => props.onError());
    }

    return (
        <IonModal
            className="auto-height-modal"
            ref={props.modalRef}
            trigger="open-taskcreation-modal"
            initialBreakpoint={1}
            breakpoints={[ 0, 1 ]}
            handle={false}
        >
            <IonHeader className="ion-no-border">
                <IonToolbar>
                <IonTitle>New Task</IonTitle>
                </IonToolbar>
            </IonHeader>
            <div className="ion-padding">
                <IonInput
                    label="Task title"
                    labelPlacement="floating"
                    autofocus={true}
                    required={true}
                    className="ion-margin-bottom"
                    value={title}
                    onIonInput={(e) => setTitle(e.target.value as string)}
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

                <div className="ion-margin-bottom horizontal-list">
                    <DatePicker date={date} setDate={setDate} />
                    <TimePicker time={time} setTime={setTime} disabled={date == null} />
                    <PrioritySelect value={priority} setValue={setPriority} />
                </div>

                <SectionDivider />

                <div style={{ textAlign: "right" }}>
                    <IonButton onClick={handleSubmit} disabled={title == undefined || title == ""}>
                        <IonIcon slot="end" icon={save}></IonIcon>
                        Save
                    </IonButton>
                </div>
            </div>
        </IonModal>
    )
}

export default TaskCreationModal;