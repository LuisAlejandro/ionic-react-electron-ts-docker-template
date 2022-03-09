import {
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/react';
import {
  pencilSharp,
  trashSharp,
  personSharp
} from 'ionicons/icons';
import moment from 'moment';
import {
  MUIDataTableColumn,
  MUIDataTableData,
  MUIDataTableMeta
} from 'mui-datatables';

import { formatRut } from 'src/shared/common/helpers';
import { AdminPatientType } from 'src/pages/Admin/types';
import { userDataInitialValues } from 'src/shared/common/values';
import insolesIcon from 'src/assets/images/svg/insoles-icon.svg';
import insolesIconGray from 'src/assets/images/svg/insoles-icon-gray.svg';
import feetIcon from 'src/assets/images/svg/feet-icon.svg';
import feetIconGray from 'src/assets/images/svg/feet-icon-gray.svg';


type SubState = {
  data: AdminPatientType[],
  showModal: (values: AdminPatientType) => void,
  deleteEntities: (id: string) => void,
};

const generateColumns = (props: SubState) => {

  const {
    data,
    showModal,
    deleteEntities,
  } = props;

  const buttonStyle = {
    '--padding-top': 0,
    '--padding-start': 0,
    '--padding-end': 0,
    '--padding-bottom': 0,
    margin: '0 4px',
    height: '18px',
  };

  const columns: MUIDataTableColumn[] = [
    {
      name: 'soleitId',
      label: 'ID SOLEIT',
      options: {
        setCellProps: () => {
          return {
            style: {
              color: 'var(--ion-color-primary)'
            }
          };
        },
      }
    },
    {
      name: 'firstName',
      label: 'Nombres',
    },
    {
      name: 'lastName',
      label: 'Apellidos',
    },
    {
      name: 'idType',
      label: 'Id',
      options: {
        customBodyRender: (value: any) => (
          <>{value == 'rut' ? 'Rut' : 'Pasaporte'}</>
        ),
      }
    },
    {
      name: 'idNumber',
      label: 'Rut/Pasaporte',
      options: {
        customBodyRender: (value: any) => (
          <>{formatRut(value)}</>
        ),
      }
    },
    {
      name: 'birthday',
      label: 'Edad',
      options: {
        customBodyRender: (value: any) => (
          <>{(moment().diff(moment(value), 'years'))}</>
        ),
      }
    },
    {
      name: "products",
      label: "Productos",
      options: {
        customBodyRender: (value: any) => {
          if (!value) value = [];
          const insoles = value.filter((p: any) => p && p.type == 'plantilla');
          const insoleNumber = insoles.length == 0 ? 0 : insoles.reduce((p: any, c: any) => p + (c.qty || 0), 0);
          const reportNumber = value.filter((p: any) => p && p.type == 'reporte').length;
          return (
            <>
              <IonGrid>
                <IonRow>
                  <IonCol class="ion-no-padding ion-text-center">
                    {insoleNumber == 0 ?
                      <img src={insolesIconGray} style={{ height: '25px' }} /> :
                      <img src={insolesIcon} style={{ height: '25px' }} />}
                  </IonCol>
                  <IonCol class="ion-no-padding ion-text-left" style={{ marginLeft: '5px', lineHeight: '25px', fontWeight: 600 }}>
                    <IonText color={insoleNumber == 0 ? 'gray30' : 'primary'}>{insoleNumber}</IonText>
                  </IonCol>
                  <IonCol class="ion-no-padding ion-text-center">
                    {reportNumber == 0 ?
                      <img src={feetIconGray} style={{ height: '25px' }} /> :
                      <img src={feetIcon} style={{ height: '25px' }} />}
                  </IonCol>
                  <IonCol class="ion-no-padding ion-text-left" style={{ marginLeft: '5px', lineHeight: '25px', fontWeight: 600 }}>
                    <IonText color={reportNumber == 0 ? 'gray30' : 'primary'}>{reportNumber}</IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </>
          )
        }
      }
    },
    {
      name: "organization.name",
      label: "Organización",
    },
    {
      name: 'createdAt',
      label: 'Fecha creación',
      options: {
        customBodyRender: (value: any) => (
          <>{moment(value).format('DD/MM/YYYY HH:mm:ss')}</>
        ),
      }
    },
    {
      name: 'acciones',
      label: 'Acciones',
      options: {
        customBodyRender: (value: any, tableMeta: MUIDataTableMeta) => {
          const currData = (tableMeta.currentTableData[tableMeta.rowIndex] as any) as MUIDataTableData;
          const record = data[currData.index];
          return (
            <>
              {userDataInitialValues.permissions.includes('view patients') && (
                <IonButton style={buttonStyle}
                           slot="icon-only" fill="clear" size="small" color="gray50"
                           routerLink={`/patients/profile/${record.id}`}>
                  <IonIcon icon={personSharp} />
                </IonButton>
              )}
              {userDataInitialValues.permissions.includes('edit patients') && (
                <IonButton style={buttonStyle}
                           slot="icon-only" fill="clear" size="small" color="gray50"
                           onClick={() => showModal(record)}>
                  <IonIcon icon={pencilSharp} />
                </IonButton>
              )}
              {userDataInitialValues.permissions.includes('destroy patients') && (
                <IonButton style={buttonStyle}
                           slot="icon-only" fill="clear" size="small" color="gray50"
                           onClick={() => deleteEntities(record.id)}>
                  <IonIcon icon={trashSharp} />
                </IonButton>
              )}
            </>
          );
        }
      }
    },
  ];

  return columns;
}

export default generateColumns;
