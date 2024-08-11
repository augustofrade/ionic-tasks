import { IonContent, IonDatetime, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import dayjs from "dayjs"

const CalendarPage = () => {
  return (
    <IonPage>
        <IonHeader className="ion-no-border">
            <IonToolbar>                    
                <IonTitle>Calendar</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent>
            <IonDatetime
                size="cover"
                presentation="date"
                min={new Date().toISOString()} max={dayjs().add(1, "year").toISOString()}
            >    
            </IonDatetime>
        </IonContent>
    </IonPage>
  )
}

export default CalendarPage