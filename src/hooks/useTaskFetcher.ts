import { useIonToast } from '@ionic/react';
import { useState } from 'react';

import { TaskService } from '../services/TaskService';
import { SavedTask } from '../types/interfaces';
import { FilterOptions } from '../types/types';

function useTaskFetcher(onFetch?: () => void) {
    const [tasks, setTasks] = useState<SavedTask[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const [presentToast] = useIonToast();
	const showToast = (message: string) => {
		presentToast({
			duration: 2500,
			position: "bottom",
			message: message
		})
    }

    function onComplete(tasks: SavedTask[]) {
        setTasks(tasks.reverse());
        setIsLoading(false);
        if(onFetch)
            onFetch();
    }

    function generalFetch(callback: Promise<SavedTask[]>) {
        callback
        .then(onComplete)
        .catch(_ => showToast("An error occured while loading tasks"));
    }

    function fetchTasks(query?: FilterOptions<SavedTask>) {
        setIsLoading(true);
        generalFetch(TaskService.instance().getAll(query));
    }

    function fetchTasksFromToday() {
        setIsLoading(true);
        generalFetch(TaskService.instance().getAllFromToday());
    }

    return {
        tasks,
        isLoading,
        fetchTasks,
        fetchTasksFromToday
    }
}

export default useTaskFetcher;