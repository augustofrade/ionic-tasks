import { IonDatetimeButton, IonModal, IonDatetime } from "@ionic/react";

const DatePicker: React.FC = () => {
  return (
    <>
      <IonDatetimeButton className="ion-justify-content-start ion-margin-top" datetime="datetime"></IonDatetimeButton>

      <IonModal keepContentsMounted={true}>
        <IonDatetime id="datetime"></IonDatetime>
      </IonModal>
    </>
  );
}

export default DatePicker;