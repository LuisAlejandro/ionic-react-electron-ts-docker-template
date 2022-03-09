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
      key: 'admin',
      label: 'Administrador',
      icon: personCircleOutline,
      permissions: [
        'view organizations',
        'view users',
        'view roles',
        'view permissions',
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
      key: 'admin/users',
      label: 'Usuarios',
      icon: peopleSharp,
      permissions: [
        'view users'
      ]
    },
    {
      key: 'admin/roles',
      label: 'Roles',
      icon: personCircleOutline,
      permissions: [
        'view roles'
      ]
    },
    {
      key: 'admin/permissions',
      label: 'Permisos',
      icon: personCircleOutline,
      permissions: [
        'view permissions'
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
