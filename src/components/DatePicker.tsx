import { IonDatetimeButton, IonModal, IonDatetime, IonChip, IonIcon, IonLabel, IonButton, IonButtons } from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import { useRef } from "react";

interface DatePickerProps {
	date: string | null;
	setDate: React.Dispatch<React.SetStateAction<string | null>>;
	noBorder?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
	const datetime = useRef<HTMLIonDatetimeElement | null>(null);
	const modal = useRef<HTMLIonModalElement | null>(null);

	function handleButtonPress() {
		if(props.date == null)
			props.setDate(new Date().toISOString());
	}

	const resetDatepicker = () => {
		datetime.current?.reset();
		props.setDate(null);
		modal.current?.dismiss();

	};
	const confirmDatepicker = () => {
		datetime.current?.confirm();
		const rawValue = datetime.current!.value as string | undefined;
		const date = rawValue == undefined ? new Date().toISOString() : rawValue;
		props.setDate(date);
		modal.current?.dismiss();
	};

	
	return (
		<>
			<IonChip
				style={ props.noBorder ? { border: "none" } : {} }
				outline={true}
				id="datepicker-chip"
				onClick={handleButtonPress}
			>
				<IonIcon icon={calendarOutline} />
				<IonLabel>Date</IonLabel>
				{
					props.date &&
					<IonDatetimeButton className="ion-justify-content-start" datetime="date-picker"></IonDatetimeButton>
				}

			</IonChip>

			<IonModal ref={modal} keepContentsMounted={true} trigger="datepicker-chip">
				<IonDatetime
					presentation="date"
					id="date-picker"
					ref={datetime}
					value={props.date}
					onIonChange={e => props.setDate(e.target.value as string)}
				>
					<IonButtons slot="buttons">
						<IonButton color="danger" onClick={resetDatepicker}>
							No Date
						</IonButton>
						<IonButton color="primary" onClick={confirmDatepicker}>
							Done
						</IonButton>
					</IonButtons>
				</IonDatetime>
			</IonModal>
		</>
	);
}

export default DatePicker;