import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNote, IonReorder, IonText, useIonAlert } from "@ionic/react";
import { StorageHandler } from "../api/StorageHandler";
import { alarmOutline, checkmarkOutline, flagOutline, trash } from "ionicons/icons";
import logo from "../assets/double-arrow-icon.svg";
import { SavedTask } from "../types/interfaces";
import dayjs from "dayjs";

interface TaskListItemProps {
	task: Pick<SavedTask, "id" | "title" | "date" | "priority" | "reminder">;
	onUpdate: () => void;
	showToast: (msg: string) => void;
}


const TaskListItem: React.FC<TaskListItemProps> = (props) => {

	const [presentAlert] = useIonAlert();

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
		.then(res => props.onUpdate())
		.catch(err => props.showToast("An error occured while trying to complete this task"));
	  }

	  // TODO: make reorder work
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
				<IonReorder slot="end"></IonReorder>
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