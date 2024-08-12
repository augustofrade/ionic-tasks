import { IonButton, IonButtons, IonChip, IonDatetime, IonDatetimeButton, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonModal, IonNote, IonToolbar } from '@ionic/react';
import dayjs from 'dayjs';
import { alarmOutline, banOutline, calendarClearOutline, calendarNumberOutline, calendarOutline, happyOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';

interface DatePickerProps {
	date: string | null;
	setDate: React.Dispatch<React.SetStateAction<string | null>>;
	noBorder?: boolean;
}

const datePickerOptions = [
	{
		icon: alarmOutline,
		text: "Tomorrow",
		value: dayjs().add(1, "day").toISOString(),
		valueLabel() { return dayjs(this.value).format("ddd"); }
	},
	{
		icon: happyOutline,
		text: "This weekend",
		value: dayjs().day(6).toISOString(),
		valueLabel() { return dayjs(this.value).format("ddd"); }
	},
	{
		icon: calendarNumberOutline,
		text: "Next week",
		value: dayjs().add(1, "week").toISOString(),
		valueLabel() { return dayjs(this.value).format("ddd (MMM D)"); }
	},
	{
		icon: banOutline,
		text: "No date",
		value: null,
		valueLabel() { return "" }
	},
	
];

const DatePicker: React.FC<DatePickerProps> = (props) => {
	const datetime = useRef<HTMLIonDatetimeElement | null>(null);
	const modal = useRef<HTMLIonModalElement | null>(null);
	const [currentDate, setCurrentDate] = useState<Date | undefined>();


	function getLabel() {
		if(currentDate == undefined)
			return null;
		else if(dayjs().isBefore(currentDate, "year"))
			return dayjs(currentDate).format("MMM D YY");
		return dayjs(currentDate).format("MMM D");
	}

	function handleButtonPress() {
		if(props.date == null)
			props.setDate(new Date().toISOString());
	}

	function setValue() {

	}

	
	return (
		<>
			<IonChip
				style={ props.noBorder ? { border: "none" } : {} }
				outline={true}
				id="datepicker-chip"
				onClick={handleButtonPress}
			>
				<IonIcon icon={calendarOutline} />
				<IonLabel>{getLabel() ?? "Date"}</IonLabel>

			</IonChip>

			<IonModal style={{ height: "auto" }} ref={modal} keepContentsMounted={true} trigger="datepicker-chip" initialBreakpoint={1} breakpoints={[0, 1]}>
				<div>
					<IonList>
						<IonItem lines="full">
							<IonIcon slot="start" icon={calendarClearOutline} />
							<IonLabel>{getLabel() ?? "No date"}</IonLabel>
						</IonItem>
						{
							datePickerOptions.map(op => (
								<IonItem lines="none" key={op.text}>
									<IonIcon color="primary" slot="start" icon={op.icon} />
									<IonLabel>{op.text}</IonLabel>
									<IonNote style={{ fontSize: 15 }} slot="end">
										{op.valueLabel.call(op)}
									</IonNote>
								</IonItem>
							))
						}
					</IonList>
					<IonDatetime
						size="cover"
						presentation="date"
						id="date-picker"
						>
					</IonDatetime>
					<IonFooter className="ion-no-border">
						<IonToolbar>
							<IonButtons slot="end">
								<IonButton color="primary" onClick={() => modal.current?.dismiss()}>
									Cancel
								</IonButton>
								<IonButton color="primary">
									Save
								</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonFooter>
				</div>
			</IonModal>
		</>
	);
}

export default DatePicker;