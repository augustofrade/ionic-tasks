import {
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonNote,
    IonText,
    useIonToast,
} from '@ionic/react';
import dayjs from 'dayjs';
import { alarmOutline, checkmarkOutline, trash } from 'ionicons/icons';

import { SavedTask } from '../../types/interfaces';
import { TaskService } from '../../services/TaskService';
import useDeleteTask from '../../hooks/useDeleteTask';

import "./TaskList.css";


interface TaskListItemProps {
	task: Pick<SavedTask, "id" | "title" | "date" | "priority" | "reminder">;
	onUpdate: () => void;
	showToast: (msg: string) => void;
}


const TaskListItem: React.FC<TaskListItemProps> = (props) => {
	const [presentUndoToast] = useIonToast();

	const onDeleteTask = useDeleteTask(() => {
		props.onUpdate();
	});

	const showUndoToast = (id:string) => presentUndoToast({
		duration: 3000,
		position: "bottom",
		message: "Task completed.",
		buttons: [{
			text: "Undo",
			side: "end",
			handler: () => {
				TaskService.instance().restoreTask(id)
				.then(res => props.onUpdate());
			}
		}]
	})

	function onCompleteTask(id: string) {
		TaskService.instance().completeTask(id)
		.then(res => {
			props.onUpdate();
			showUndoToast(id);
		})
		.catch(err => props.showToast("An error occured while trying to complete this task"));
	}

	const priorityColor = props.task.priority?.toLowerCase();

	return (
		<IonItemSliding key={props.task.id} className={priorityColor ? "task-item-" + priorityColor : "task-item"}>
			<IonItem routerLink={`/task/${props.task.id}`} lines="full">
				<IonLabel className="task-item__label">
					<IonText>{ props.task.title }</IonText>
					{
						props.task.reminder &&
						<>
							<br />
							<IonNote className="task-item__reminder">
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