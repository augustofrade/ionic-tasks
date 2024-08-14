import { IonChip, IonIcon, IonItem, IonList, IonPopover, IonText } from '@ionic/react';
import { flagOutline } from 'ionicons/icons';
import React, { useRef, useState } from 'react';

import { Priority } from '../types/enums';


interface PrioritySelectProps {
	value: Priority | null;
	onItemClick(value: Priority | null): void;
}

const PrioritySelect: React.FC<PrioritySelectProps> = ({ value, onItemClick }) => {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const popover = useRef<HTMLIonPopoverElement>(null);

	const openPopover = (e: any) => {
		popover.current!.event = e;
		setPopoverOpen(true);
	};

	return (
		<span>
			<IonChip outline={true} onClick={openPopover}>
				<IonIcon icon={flagOutline} />
				<IonText>{ value ?? "Priority" }</IonText>

				<IonPopover
					isOpen={popoverOpen}
					ref={popover}
					onDidDismiss={() => setPopoverOpen(false)}
					showBackdrop={false}
				>
					<IonList>
						{
							Object.entries(Priority).map(([k, v]) => (
								<IonItem
									key={k}
									button
									onClick={() => {
										onItemClick(k as Priority);
										setPopoverOpen(false);
										popover.current!.dismiss();
									}}
									lines="none"
								>
									{v}
								</IonItem> 
							))
						}
					</IonList>
				</IonPopover>
			</IonChip>
		</span>
    )
}

export default PrioritySelect;