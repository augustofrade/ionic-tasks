import { IonButton, IonButtons, IonChip, IonDatetime, IonFooter, IonIcon,
	IonItem, IonLabel, IonList, IonModal, IonNote, IonToolbar } from '@ionic/react';
import dayjs from 'dayjs';
import { alarmOutline, banOutline, calendarClearOutline, calendarNumberOutline, calendarOutline,
    happyOutline,
    todayOutline,
} from 'ionicons/icons';
import { useRef, useState } from 'react';

import "../css/autoHeightModal.css";

interface DatePickerProps {
	date: string | null;
	setDate: React.Dispatch<React.SetStateAction<string | null>>;
	noBorder?: boolean;
}

interface DatePickerOptions {
	icon: string;
	text: string;
	value: string | null;
	valueLabel(): string;
}

const datePickerOptions: Array<DatePickerOptions> = [
	{
		icon: todayOutline,
		text: "Today",
		value: new Date().toISOString(),
		valueLabel() { return dayjs(this.value).format("ddd"); }
	},
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
	const modal = useRef<HTMLIonModalElement | null>(null);
	const [currentDate, setCurrentDate] = useState<string | null>(props.date);

	function getDateLabel(date: string | null, fallback: string) {
		if(!date)
			return fallback;
		else if(dayjs().isBefore(date, "year"))
			return dayjs(date).format("MMM D YY");
		return dayjs(date).format("MMM D");
	}

	function cancelAndClose() {
		modal.current?.dismiss()
	}

	function setDateAndClose() {
		props.setDate(currentDate);
		modal.current?.dismiss();
	}
	
	return (
		<>
			<IonChip
				style={ props.noBorder ? { border: "none" } : {} }
				outline={true}
				id="datepicker-chip"
			>
				<IonIcon icon={calendarOutline} />
				<IonLabel>{ getDateLabel(props.date, "Date") }</IonLabel>

			</IonChip>

			<IonModal
				style={{ height: "auto" }}
				ref={modal}
				trigger="datepicker-chip"
				initialBreakpoint={1}
				breakpoints={[0, 1]}
				className="auto-height-modal"
				handle={false}
			>
				<div>
					<IonList>
						<IonItem lines="full">
							<IonIcon slot="start" icon={calendarClearOutline} />
							<IonLabel>{getDateLabel(currentDate, "No date")}</IonLabel>
						</IonItem>
						{
							datePickerOptions.map(op => (
								<IonItem
									key={op.text}
									lines="none"
									onClick={() => setCurrentDate(op.value)}
									button
								>
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
						value={currentDate}
						onIonChange={(e) => setCurrentDate(e.target.value as string)}
						>
					</IonDatetime>
					
					<hr style={{ backgroundColor: "rgba(0, 0, 0, 0.13)" }} />

					<IonFooter className="ion-no-border">
						<IonToolbar>
							<IonButtons slot="end">
								<IonButton color="primary" onClick={cancelAndClose}>
									Cancel
								</IonButton>
								<IonButton color="primary" onClick={setDateAndClose}>
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