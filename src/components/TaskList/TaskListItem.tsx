import {
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonNote,
    IonText,
    useIonAlert,
    useIonToast,
} from '@ionic/react';
import dayjs from 'dayjs';
import { alarmOutline, checkmarkOutline, trash } from 'ionicons/icons';

import { StorageHandler } from '../../api/StorageHandler';
import { SavedTask } from '../../types/interfaces';

interface TaskListItemProps {
	task: Pick<SavedTask, "id" | "title" | "date" | "priority" | "reminder">;
	onUpdate: () => void;
	showToast: (msg: string) => void;
}


const TaskListItem: React.FC<TaskListItemProps> = (props) => {

	const [presentAlert] = useIonAlert();
	const [presentUndoToast] = useIonToast();
	const showUndoToast = (id:string) => presentUndoToast({
		duration: 3000,
		position: "bottom",
		message: "Task completed.",
		buttons: [{
			text: "Undo",
			side: "end",
			handler: () => {
				StorageHandler.instance().restoreTask(id)
				.then(res => props.onUpdate());
			}
		}]
	})

	function handleDeleteTask(id: string) {
		StorageHandler.instance().remove(id)
		.then(res => {
		  props.showToast("Task deleted successfully");
		  props.onUpdate();
		})
		.catch(err => {
		  props.showToast("An error occured while trying to delete this task")
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

	  function onCompleteTask(id: string) {
		StorageHandler.instance().completeTask(id)
		.then(res => {
			props.onUpdate();
			showUndoToast(id);
		})
		.catch(err => props.showToast("An error occured while trying to complete this task"));
	  }

	  // TODO: add priority label
	return (
		<IonItemSliding key={props.task.id}>
			<IonItem routerLink={`/task/${props.task.id}`} lines="full">
				<IonLabel>
					<IonText>{ props.task.title }</IonText>
					{
						props.task.reminder &&
						<>
							<br />
							<IonNote style={{ display: "inline-flex", alignItems: "center", columnGap: 2 }}>
								<IonIcon icon={alarmOutline} />
								<IonText>{dayjs(props.task.reminder.date).format("HH:mm")}</IonText>
							</IonNote>
						</>
					}
				</IonLabel>
			</IonItem>
			
			<IonItemOptions side="start">
				<IonItemOption color="success" onClick={() => onCompleteTask(props.task.id)}>
					<IonIcon slot="icon-only" icon={checkmarkOutline} />
				</IonItemOption>
			</IonItemOptions>

			<IonItemOptions side="end">
				<IonItemOption color="danger" onClick={() => onDeleteTask(props.task.id)}>
					<IonIcon slot="icon-only" icon={trash} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	)
}

export default TaskListItem;