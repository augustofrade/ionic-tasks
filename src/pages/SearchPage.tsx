import { IonContent, IonHeader, IonLoading, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useState } from 'react';

import TaskList from '../components/TaskList/TaskList';
import useTaskFetcher from '../hooks/useTaskFetcher';

const SearchPage = () => {
    const [search, setSearch] = useState("");
    const { tasks, fetchTasks, isLoading } = useTaskFetcher();

    const [presentToast] = useIonToast();
    const showToast = (message: string) => {
        presentToast({
            duration: 2500,
            position: "bottom",
            message: message
        })
    }

    function fetchWithQuery(val: string) {
        const query = val != "" ? val.toUpperCase() : search.toUpperCase();
        fetchTasks({ title: (value) => value.toUpperCase().includes(query) });
    }

    function handleSearchInput(val: string) {
        setSearch(val);
        fetchWithQuery(val);
    }
    
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>
                    Search
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonSearchbar
                    value={search}
                    debounce={1000}
                    onIonInput={(e) => { handleSearchInput(e.target.value as string) }}
                    />
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonLoading isOpen={isLoading} />
            {
                search != "" &&
                <TaskList
                    data={tasks}
                    onUpdate={() => fetchWithQuery(search)}
                    showToast={showToast}
                    message={"No tasks found"}
                />
            }
            </IonContent>
        </IonPage>
  )
}

export default SearchPage;