import { IonDatetimeButton, IonModal, IonDatetime, IonChip, IonIcon, IonLabel, IonButton, IonButtons } from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import { useRef } from "react";

interface DatePickerProps {
	date: Date | null;
	setDate: React.Dispatch<React.SetStateAction<Date | null>>;
	noBorder?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
	const datetime = useRef<HTMLIonDatetimeElement | null>(null);
	const modal = useRef<HTMLIonModalElement | null>(null);

	function handleButtonPress() {
		if(props.date == null)
			props.setDate(new Date());
	}

	const resetDatepicker = () => {
		datetime.current?.reset();
		props.setDate(null);
		modal.current?.dismiss();

	};
	const confirmDatepicker = () => {
		datetime.current?.confirm();
		const date = datetime.current!.value as string;
		props.setDate(new Date(date));
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