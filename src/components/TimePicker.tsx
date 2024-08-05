import { IonButton, IonButtons, IonChip, IonDatetime, IonDatetimeButton, IonIcon, IonLabel, IonModal } from '@ionic/react';
import { alarmOutline, calendarOutline } from 'ionicons/icons';
import { useEffect, useRef } from 'react';

interface TimePickerProps {
	time: Date | null;
	setTime: React.Dispatch<React.SetStateAction<Date | null>>;
  	label?: string;
	disabled: boolean;
	noBorder?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = (props) => {
	const datetime = useRef<HTMLIonDatetimeElement | null>(null);
	const modal = useRef<HTMLIonModalElement | null>(null);

	useEffect(() => {
		if(props.disabled)
			props.setTime(null);
	}, [props.disabled]);

	function handleButtonPress() {
		if(props.time == null)
			props.setTime(new Date());
	}

	const resetDatepicker = () => {
		datetime.current?.reset();
		props.setTime(null);
		modal.current!.dismiss();

	};
	const confirmDatepicker = () => {
		datetime.current?.confirm();
		const rawValue = datetime.current!.value as string | undefined;
		const date = rawValue == undefined ? new Date() : new Date(rawValue);
		props.setTime(date);
		modal.current!.dismiss();
	};

	
	return (
		<>
			<IonChip
				style={ props.noBorder ? { border: "none" } : {} }
				outline={true}
				disabled={props.disabled}
				id="timepicker-chip"
				onClick={handleButtonPress}
			>
				<IonIcon icon={alarmOutline} />
				<IonLabel>{ props.label ?? "Time" }</IonLabel>
				{
					props.time &&
					<IonDatetimeButton className="ion-justify-content-start" datetime="time-picker"></IonDatetimeButton>
				}

			</IonChip>

			<IonModal ref={modal} keepContentsMounted={true} trigger="timepicker-chip">
				<IonDatetime
					presentation="time"
					id="time-picker"
					ref={datetime}
				>
					<IonButtons slot="buttons">
						<IonButton color="danger" onClick={resetDatepicker}>
							No Reminder
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

export default TimePicker;