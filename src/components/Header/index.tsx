import React, { useState, MouseEvent } from 'react';
import {
  IonIcon,
  IonToolbar,
  IonButtons,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonList,
  IonListHeader,
  IonPopover,
  IonLabel,
} from '@ionic/react';
import {
  logOutOutline,
  ellipseSharp,
  alertCircleSharp,
} from 'ionicons/icons';

import history from 'src/baseplate/history';
import { userDataInitialValues } from 'src/shared/common/values';
import OrgLogo from 'src/assets/images/png/orglogo.png';
import AvatarImg from 'src/assets/images/png/avatar.png';

import { userService } from './services';
import style from './style.module.scss';


type UserMenuState = {
  showUserMenu: boolean,
  event: Event | undefined,
};

type NotificationMenuState = {
  showNotificationsMenu: boolean,
  event: Event | undefined,
};

const Header: React.FC = () => {

  const [ userMenuState, setUserMenuState ] = useState<UserMenuState>({
    showUserMenu: false,
    event: undefined,
  });
  const [ notificationsMenuState, setNotificationsMenuState ] = useState<NotificationMenuState>({
    showNotificationsMenu: false,
    event: undefined,
  });

  const userLogout = () => {
    userService.logout();
  }
  
  return (
    <>
      <IonPopover class="user-menu-popover" translucent={true} showBackdrop={false}
        event={userMenuState.event} isOpen={userMenuState.showUserMenu}
        onDidDismiss={() => setUserMenuState({ showUserMenu: false, event: undefined })}>
        <div className="triangle-top"></div>
        <IonList>
          {userDataInitialValues.permissions.includes('view self') && (
            <IonItem class="header" button lines="full"
                    onClick={() => {
                      history.push('/users/profile/self');
                    }}>
              <IonGrid>
                <IonRow class="ion-no-padding ion-no-margin">
                  <IonCol class="ion-no-padding ion-no-margin" size="6">
                    <img src={userDataInitialValues.avatar || AvatarImg} />
                  </IonCol>
                  <IonCol class="ion-no-padding ion-no-margin" size="18">
                    <IonRow class="ion-no-padding ion-no-margin">
                      <IonLabel class="ion-no-margin ion-no-padding name" color="black">
                        {`${userDataInitialValues.firstName} ${userDataInitialValues.lastName}`}
                      </IonLabel>
                    </IonRow>
                    <IonRow class="ion-no-padding ion-no-margin">
                      <IonLabel class="ion-no-margin ion-no-padding" color="gray50">
                        Ver tu perfil
                      </IonLabel>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          )}
          <IonItem button lines="none" onClick={userLogout}>
            <IonIcon color="primary" icon={logOutOutline} />
            <IonLabel class="ion-no-margin ion-no-padding" color="gray50">
              Cerrar sesión
            </IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
      <IonPopover class="notifications-menu-popover" translucent={true} showBackdrop={false}
        event={notificationsMenuState.event} isOpen={notificationsMenuState.showNotificationsMenu}
        onDidDismiss={() => setNotificationsMenuState({ showNotificationsMenu: false, event: undefined })}>
        <div className="triangle-top"></div>
        <IonList>
          <IonListHeader>Notificaciones</IonListHeader>
          <IonItem lines="none">
            <IonIcon color="danger" size="small" icon={ellipseSharp} />
            <IonLabel class="ion-no-margin ion-no-padding" color="gray50">
              Lorem ipsum dolor sit amet consectetur
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon color="danger" size="small" icon={ellipseSharp} />
            <IonLabel class="ion-no-margin ion-no-padding" color="gray50">
              Lorem ipsum dolor sit amet consectetur
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon color="gray30" size="small" icon={ellipseSharp} />
            <IonLabel class="ion-no-margin ion-no-padding" color="gray30">
              Lorem ipsum dolor sit amet consectetur
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon color="gray30" size="small" icon={ellipseSharp} />
            <IonLabel class="ion-no-margin ion-no-padding" color="gray30">
              Lorem ipsum dolor sit amet consectetur
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon color="gray30" size="small" icon={ellipseSharp} />
            <IonLabel class="ion-no-margin ion-no-padding" color="gray30">
              Lorem ipsum dolor sit amet consectetur
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon color="gray30" size="small" icon={ellipseSharp} />
            <IonLabel class="ion-no-margin ion-no-padding" color="gray30">
              Lorem ipsum dolor sit amet consectetur
            </IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
      <IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="8" size-sm="12" size-md="16" size-xl="20" className={style['header-main']}>
              <img src={userDataInitialValues.orgLogo || OrgLogo} />
            </IonCol>
            <IonCol size="16" size-sm="12" size-md="8" size-xl="4" className={style['header-notifications']}>
              <IonButtons class="ion-justify-content-end">
                <IonButton className={style['notifications']}
                           onClick={(e: MouseEvent<HTMLIonButtonElement>) => {
                             e.persist();
                             setNotificationsMenuState({ showNotificationsMenu: true, event: e.nativeEvent })
                           }}>
                  <IonIcon size="small" color="gray30" icon={alertCircleSharp} />
                </IonButton>
                <IonButton className={style['user-menu-avatar']}
                           onClick={(e: MouseEvent<HTMLIonButtonElement>) => {
                             e.persist();
                             setUserMenuState({ showUserMenu: true, event: e.nativeEvent })
                           }}>
                  <img src={userDataInitialValues.avatar || AvatarImg} />
                </IonButton>
              </IonButtons>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </>
  )
};

export default Header;
