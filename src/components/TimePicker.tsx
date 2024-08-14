import '../css/autoHeightModal.css';

import { IonButton, IonButtons, IonChip, IonDatetime, IonIcon, IonLabel, IonModal } from '@ionic/react';
import dayjs from 'dayjs';
import { alarmOutline } from 'ionicons/icons';
import { useEffect, useRef } from 'react';

interface TimePickerProps {
	time: string | null;
	setTime: React.Dispatch<React.SetStateAction<string | null>>;
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
			props.setTime(new Date().toISOString());
	}

	function resetDatepicker() {
		datetime.current?.reset();
		props.setTime(null);
		modal.current!.dismiss();

	};

	function confirmDatepicker() {
		datetime.current?.confirm();
		const rawValue = datetime.current!.value as string | undefined;
		const date = rawValue == undefined ? new Date().toISOString() : rawValue;
		props.setTime(date);
		modal.current!.dismiss();
	};

	function getTimeLabel() {
		if(props.time == undefined)
			return "Reminder";
		return dayjs(props.time).format("HH:mm");
	}

	
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
				<IonLabel>{ getTimeLabel() }</IonLabel>
			</IonChip>

			<IonModal
				className="auto-height-modal"
				ref={modal}
				keepContentsMounted={true}
				trigger="timepicker-chip"
				initialBreakpoint={1}
				breakpoints={[0, 1]}
				handle={false}
			>
				<IonDatetime
					value={props.time}
					onIonChange={(e) => props.setTime(e.target.value as string)}
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