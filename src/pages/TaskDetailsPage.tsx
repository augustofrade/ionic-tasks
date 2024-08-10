import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSkeletonText, IonText, useIonViewWillEnter, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillLeave, IonList, IonItem, IonIcon, IonLabel, IonBackButton, IonButtons, IonButton, IonPopover, IonChip } from "@ionic/react"
import { useEffect, useState } from "react";
import { SavedTask } from "../types/interfaces";
import { StorageHandler } from "../api/StorageHandler";
import { RouteComponentProps } from "react-router";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import { alarmOutline, calendarOutline, ellipsisVertical, flagOutline, pencilOutline, trashBinOutline } from "ionicons/icons";
import dayjs from "dayjs";
import { Priority } from "../types/enums";
import SkeletonText from "../components/SkeletonText";

interface TaskDetailsPageProps extends RouteComponentProps<{
	id: string;
}> {}


const TaskDetailsPage: React.FC<TaskDetailsPageProps> = ({ match }) => {

	const [info, setInfo] = useState<SavedTask | null>(null);

	const dateLabel = dayjs().isSame(info?.date, "day")
		? "Today"
		: dayjs(info?.date).format("ddd, MMM D, YYYY") ;

	const reminderLabel = info?.reminder ? dayjs(info.reminder.date).format("HH:mm") : "None";

	// TODO: set priority display colors
	const priorityLabel = info?.priority
		? Priority[info.priority as unknown as keyof typeof Priority]
		: "Not defined";
	
	useIonViewDidEnter(() => {
		StorageHandler.instance().get(match.params.id)
		.then(res => {
			setInfo(res);
		})
		.catch(err => console.log(err));
		// TODO: show error warning
	});

	useIonViewDidLeave(() => {
		setInfo(null);
	});

	return (
		<IonPage>
			<IonHeader className="ion-no-border">
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton />
					</IonButtons>

					<IonTitle className="ion-text-center">
						{ info?.title }
					</IonTitle>
					
					<IonButtons slot="end">
						<IonButton shape="round" id="task-options">
							<IonIcon icon={ellipsisVertical} />
						</IonButton>
						<IonPopover trigger="task-options">
							<IonContent>
								<IonList>
									<IonItem lines="none">
										<IonIcon icon={trashBinOutline} slot="start" />
										<IonLabel>Delete</IonLabel>
									</IonItem>
									<IonItem lines="none">
										<IonIcon icon={pencilOutline} slot="start" />
										<IonLabel>Edit</IonLabel>
									</IonItem>
								</IonList>
							</IonContent>
						</IonPopover>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				{
					info
					? <>
					<IonHeader collapse="condense">
						<IonToolbar>
							<IonTitle>{ info?.title }</IonTitle>
						</IonToolbar>
					</IonHeader>
					<div>
						<IonList className="ion-margin-vertical">
							<IonItem lines="full">
								<IonIcon icon={calendarOutline} slot="start" />
								<IonLabel style={{ padding: "8px 0" }}>{dateLabel}</IonLabel>
							</IonItem>
							<IonItem lines="full" disabled={!info.reminder}>
								<IonIcon icon={alarmOutline} slot="start" />
								<IonLabel style={{ padding: "8px 0" }}>Reminder: {reminderLabel}</IonLabel>
							</IonItem>
							<IonItem lines="none">
								<IonIcon icon={flagOutline} slot="start" />
								<IonLabel style={{ padding: "8px 0" }}>{ priorityLabel }</IonLabel>
							</IonItem>
						</IonList>

						<div className="ion-text-center">
							{
								info?.labels?.map(label => (
									<IonChip key={label}>{label}</IonChip>
								))
							}
						</div>

						<div className="ion-margin-top">
							<IonText style={{ textAlign: "justify", display: "block" }}>{ info?.description }</IonText>
						</div>
					</div>
					</>
					// TODO: create component for the whole page + skeleton text
					: <div>
						<SkeletonText height={25} />
						<IonList className="ion-margin-vertical">
							<IonItem lines="full">
								<IonIcon icon={calendarOutline} slot="start" />
								<IonLabel style={{ padding: "8px 0" }}>
									<SkeletonText />
								</IonLabel>
							</IonItem>
							<IonItem lines="full">
								<IonIcon icon={alarmOutline} slot="start" />
								<IonLabel style={{ padding: "8px 0" }}>
									<SkeletonText />
								</IonLabel>
							</IonItem>
							<IonItem lines="none">
								<IonIcon icon={flagOutline} slot="start" />
								<IonLabel style={{ padding: "8px 0" }}>
									<SkeletonText />
								</IonLabel>
							</IonItem>
						</IonList>

						<div className="ion-margin-top">
							<IonText style={{ textAlign: "justify", display: "block" }}>
								<SkeletonText height={100} />
							</IonText>
						</div>
					</div>
					
				}
			</IonContent>
		</IonPage>
	)
}

export default TaskDetailsPage;