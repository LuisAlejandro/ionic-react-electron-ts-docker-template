import React from 'react';
import { IonSpinner, IonContent } from '@ionic/react';

const Spinner: React.FC = () => {
  return (
    <IonContent>
      <IonSpinner name="crescent" style={{ position: 'fixed', top: '50%', left: '50%'}} />
    </IonContent>
  )
};

export default Spinner;
