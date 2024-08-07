import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonReorder, useIonAlert } from "@ionic/react";
import { StorageHandler } from "../api/StorageHandler";
import { checkmarkOutline, trash } from "ionicons/icons";
import logo from "../assets/double-arrow-icon.svg";

interface TaskListItemProps {
	id: string;
	title: string;
	date?: string;
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

	  // TODO: add sliding icon to help users
	return (
		<IonItemSliding key={props.id}>
			<IonItem routerLink={`/task/${props.id}`}>
				<IonLabel>{ props.title }</IonLabel>
				<IonReorder slot="end"></IonReorder>
			</IonItem>
			
			<IonItemOptions side="start">
				<IonItemOption color="success" onClick={() => onCompleteTask(props.id)}>
					<IonIcon slot="icon-only" icon={checkmarkOutline} />
				</IonItemOption>
			</IonItemOptions>

			<IonItemOptions side="end">
				<IonItemOption color="danger" onClick={() => onDeleteTask(props.id)}>
					<IonIcon slot="icon-only" icon={trash} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	)
}

export default TaskListItem;