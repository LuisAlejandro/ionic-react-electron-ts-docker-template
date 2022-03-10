import { ReactNode, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import Header from 'src/components/Header/Loadable';
import Sidebar from 'src/components/Sidebar/Loadable';

import style from './style.module.scss';
import './os-patch.scss';


type SubState = {
  className: boolean,
  children: ReactNode,
};

const Page = (props: SubState) => {

  const { children, className } = props;
  const [ isSubMenuOpen, setSubMenuOpen ] = useState(false);

  const isExpanded = !window.location.pathname.startsWith('/patients/profile/');

  return (
    <IonPage id="page" className={style['page']}>
      <IonHeader>
        <Header />
      </IonHeader>
      <IonContent className={`page-scrollbars ${style['content']}`}>
        <OverlayScrollbarsComponent>
          <IonGrid className={style['main-grid']}>
            <IonRow>
              <Sidebar {...{ isSubMenuOpen, setSubMenuOpen, isExpanded }}/>
              <IonCol size="16" size-sm="18" size-md="20"
                      size-xl={isSubMenuOpen ? isExpanded ? '19' : '20' : isExpanded ? '22' : '23'}
                      className={`${style['right-panel']} ${className}`}>
                  {children}
              </IonCol>
            </IonRow>
          </IonGrid>
        </OverlayScrollbarsComponent>
      </IonContent>
    </IonPage>
  );
};

export default Page;
