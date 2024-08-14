import { IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonToast, useIonViewWillEnter } from "@ionic/react"
import { useState } from "react";
import { TaskService } from "../services/TaskService";
import { SavedTask } from "../types/interfaces";
import TaskList from "../components/TaskList/TaskList";

const SearchPage = () => {
    const [search, setSearch] = useState("");

    const [presentToast] = useIonToast();
    const showToast = (message: string) => {
        presentToast({
        duration: 2500,
        position: "bottom",
        message: message
        })
    }

    const [tasks, setTasks] = useState<SavedTask[]>([]);

    function handleSearchInput(val: string) {
        setSearch(val);
        fetchTasks(val);
    }

    function fetchTasks(query: string) {
        TaskService.instance().getAll({ title: (value) => value.includes(query) })
        .then(res => {
            setTasks(res.reverse());
        })
        .catch(err => showToast("An error occured while searching for tasks"));
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
                    onIonInput={(e) => handleSearchInput(e.target.value as string)}
                    />
                </IonToolbar>
            </IonHeader>
            <IonContent>
            {
                search != "" &&
                <TaskList
                    data={tasks}
                    onUpdate={() => fetchTasks(search)}
                    showToast={showToast}
                    message={"No tasks found"}
                />
            }
            </IonContent>
        </IonPage>
  )
}

export default SearchPage;