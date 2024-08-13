import { useIonAlert, useIonToast } from '@ionic/react';

import { TaskService } from '../services/TaskService';

function useDeleteTask (callback?: () => void) {
	const [presentAlert] = useIonAlert();
	const [presentToast] = useIonToast();
	const showToast = (message: string) => {
		presentToast({
			duration: 2500,
			position: "bottom",
			message: message
		})
    }

    function handleDeleteTask(id: string) {
		TaskService.instance().remove(id)
		.then(res => {
			showToast("Task deleted successfully");
			if(callback)
				callback();
		})
		.catch(err => {
		  showToast("An error occured while trying to delete this task")
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

	return onDeleteTask;
}

export default useDeleteTask;