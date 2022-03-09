import React from 'react';
import {
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
} from '@ionic/react';
import {
  addOutline,
  homeSharp,
  readerSharp,
  personSharp,
  peopleSharp,
  personCircleOutline,
  closeSharp,
} from 'ionicons/icons';

import { userDataInitialValues } from 'src/shared/common/values';
import divider from 'src/assets/images/svg/divider.svg';
import dividerBlue from 'src/assets/images/svg/divider-blue.svg';
import powered from 'src/assets/images/svg/powered.svg';

import style from './style.module.scss';


type SubState = {
  isSubMenuOpen: boolean,
  setSubMenuOpen: (x: boolean) => void,
  isExpanded: boolean,
};

type Menu = {
  key: string,
  label: string,
  icon: string,
  permissions: string[]
};

const Sidebar = (props: SubState) => {

  const {
    isSubMenuOpen,
    setSubMenuOpen,
    isExpanded,
  } = props;

  const menu: Menu[] = [
    {
      key: 'home',
      label: 'Inicio',
      icon: homeSharp,
      permissions: [
        'view self'
      ]
    },
    {
      key: 'requests',
      label: 'Solicitudes',
      icon: readerSharp,
      permissions: [
        'view requests'
      ]
    },
    {
      key: 'admin/patients',
      label: 'Pacientes',
      icon: personSharp,
      permissions: [
        'view patients'
      ]
    },
    {
      key: 'admin/users',
      label: 'Usuarios',
      icon: peopleSharp,
      permissions: [
        'view users'
      ]
    },
    {
      key: 'admin',
      label: 'Administrador',
      icon: personCircleOutline,
      permissions: [
        'view organizations',
        'view materials',
        'view terminations',
        'view devices',
        'view doctors',
        'view pickupaddresses'
      ]
    },
  ];
    
  const adminSubmenu: Menu[] = [
    {
      key: 'admin/organizations',
      label: 'Organizaciones',
      icon: personCircleOutline,
      permissions: [
        'view organizations'
      ]
    },
    {
      key: 'admin/materials',
      label: 'Materiales',
      icon: personCircleOutline,
      permissions: [
        'view materials'
      ]
    },
    {
      key: 'admin/terminations',
      label: 'Terminaciones',
      icon: personCircleOutline,
      permissions: [
        'view terminations'
      ]
    },
    {
      key: 'admin/devices',
      label: 'Equipos',
      icon: personCircleOutline,
      permissions: [
        'view devices'
      ]
    },
    {
      key: 'admin/doctors',
      label: 'Doctores',
      icon: personCircleOutline,
      permissions: [
        'view doctors'
      ]
    },
    {
      key: 'admin/pickupaddresses',
      label: 'Direcciones de retiro',
      icon: personCircleOutline,
      permissions: [
        'view pickupaddresses'
      ]
    },
  ];

  const urlPathname = window.location.pathname.substring(1);

  const menuItems = menu.filter((menuItem: Menu) =>
    menuItem.permissions.some((p: string) => userDataInitialValues.permissions.includes(p)));
  const adminSubmenuItems = adminSubmenu.filter((adminSubmenuItem: Menu) =>
    adminSubmenuItem.permissions.some((p: string) => userDataInitialValues.permissions.includes(p)));

  return (
    <>
      <IonCol size="8" size-sm="6" size-md="4" size-xl={isExpanded ? '2' : '1'}
              className={style['left-panel']} class="ion-no-padding">
        <IonGrid>
          {userDataInitialValues.permissions.includes('create requests') && (
            <IonRow class="ion-padding-vertical ion-justify-content-center">
              <IonButton
                fill="solid"
                expand="block"
                color="iprimary"
                class="ion-text-capitalize"
                className={style['solicitud-button']}
                onClick={() => {
                  location.href = '/requests/assistant';
                }}>
                <IonIcon slot="icon-only" icon={addOutline} />
                {isExpanded && <IonLabel>Solicitud</IonLabel>}
              </IonButton>
            </IonRow>
          )}
          <IonRow>
            <IonList className={style['left-panel-ionlist']}>
              {menuItems.map((menuItem: Menu, idx: number) => (
                <IonItem
                  button
                  lines="none"
                  color="iwhite"
                  key={`menu-item-${menuItem.key}-${idx}`}
                  onClick={() => {
                    if (menuItem.key == 'admin') {
                      setSubMenuOpen(true);
                    } else {
                      setSubMenuOpen(false);
                      location.href = `/${menuItem.key}`;
                    }
                  }}>
                  <IonGrid>
                    <IonRow class="ion-no-padding ion-no-margin">
                      <IonCol size="2" class="ion-no-padding ion-no-margin">
                        {menuItem.key == urlPathname && <img src={divider} className={style['divider']} />}
                      </IonCol>
                      <IonCol size="20" class="ion-no-padding ion-no-margin" style={{ height: '36px' }}>
                        <IonRow class="ion-no-padding ion-no-margin"
                                style={isExpanded ? {} : { paddingTop: '9px', paddingBottom: '9px' }}>
                          <IonIcon size="small" icon={menuItem.icon} />
                        </IonRow>
                        {isExpanded && (
                          <IonRow class="ion-no-padding ion-no-margin">
                            <IonLabel
                              class="ion-no-margin ion-text-center"
                              style={menuItem.key == urlPathname ? { fontWeight: 600 } : {}}>
                              {menuItem.label}
                            </IonLabel>
                          </IonRow>
                        )}
                      </IonCol>
                      <IonCol size="2" class="ion-no-padding ion-no-margin"></IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>
              ))}
            </IonList>
          </IonRow>
          <IonRow class="ion-padding-vertical ion-justify-content-center">
            {isExpanded && <img src={powered} className={style["powered"]} />}
          </IonRow>
        </IonGrid>
      </IonCol>
      {isSubMenuOpen && (
        <IonCol size="8" size-sm="6" size-md="4" size-xl="3"
                className={style['drawer-panel']} class="ion-no-padding">
          <IonGrid class="ion-no-padding">
            <IonRow class="ion-padding-bottom ion-margin-bottom ion-justify-content-end" style={{ height: '300px' }}>
              <IonButtons style={{ height: '40px', width: '40px' }}>
                <IonButton slot="end" fill="clear"
                          size="small" color="gray70"
                          onClick={() => {
                            setSubMenuOpen(false);
                          }}>
                  <IonIcon icon={closeSharp} />
                </IonButton>
              </IonButtons>
            </IonRow>
            <IonRow class="ion-padding ion-justify-content-center">
              <IonList className={style['left-panel-submenu']}>
                {adminSubmenuItems.map((subMenuItem: Menu, idx: number) => (
                  <IonItem
                    button
                    lines="none"
                    color="igray7primary"
                    key={`admin-submenu-item-${subMenuItem.key}-${idx}`}
                    onClick={() => {
                      setSubMenuOpen(false);
                      location.href = `/${subMenuItem.key}`;
                    }}>
                    <IonGrid>
                      <IonRow class="ion-no-padding ion-no-margin">
                        <IonCol size="2" class="ion-no-padding ion-no-margin" style={{ height: '20px' }}>
                          {subMenuItem.key == urlPathname && (
                            <img src={dividerBlue} className={style["divider-blue"]} />
                          )}
                        </IonCol>
                        <IonCol size="20" class="ion-no-padding ion-no-margin">
                          <IonRow class="ion-no-padding ion-no-margin">
                            <IonLabel
                              class="ion-no-margin"
                              style={
                                subMenuItem.key == urlPathname
                                  ? { fontWeight: 600 }
                                  : {}}>
                              {subMenuItem.label}
                            </IonLabel>
                          </IonRow>
                        </IonCol>
                        <IonCol size="2" class="ion-no-padding ion-no-margin"></IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                ))}
              </IonList>
            </IonRow>
          </IonGrid>
        </IonCol>
      )}
    </>
  );
};

export default Sidebar;
