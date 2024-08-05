import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSkeletonText } from "@ionic/react"
import { useEffect, useState } from "react";
import { SavedTask } from "../types/interfaces";
import { StorageHandler } from "../api/StorageHandler";
import { RouteComponentProps } from "react-router";

interface TaskDetailsPageProps extends RouteComponentProps<{
	id: string;
}> {}

const TaskDetailsPage: React.FC<TaskDetailsPageProps> = ({ match }) => {

	const [info, setInfo] = useState<SavedTask | null>(null);
	useEffect(() => {

		StorageHandler.instance().get(match.params.id)
		.then(res => setInfo(res))
		.catch(err => console.log(err));
		// TODO: show error warning
	}, []);

	return (
		<IonPage>
			<IonHeader className="ion-no-border">
				<IonToolbar>
					<IonTitle>
						{ info?.title }
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">{ info?.title }</IonTitle>
					</IonToolbar>
				</IonHeader>
			</IonContent>
		</IonPage>
	)
}

export default TaskDetailsPage;