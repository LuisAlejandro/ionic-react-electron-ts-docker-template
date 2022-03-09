import {
  IonIcon,
  IonButton,
} from '@ionic/react';
import {
  pencilSharp,
  trashSharp
} from 'ionicons/icons';
import moment from 'moment';
import {
  MUIDataTableColumn,
  MUIDataTableData,
  MUIDataTableMeta
} from 'mui-datatables';

import { AdminDoctorType } from 'src/pages/Admin/types';
import { userDataInitialValues } from 'src/shared/common/values';


type SubState = {
  data: AdminDoctorType[],
  showModal: (values: AdminDoctorType) => void,
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
      name: "name",
      label: "Nombre del Doctor",
    },
    {
      name: "qualification",
      label: "Especialidad",
    },
    {
      name: "idType",
      label: "Identificación",
    },
    {
      name: "idNumber",
      label: "Rut/Pasaporte",
    },
    {
      name: "organization.name",
      label: "Organización",
    },
    {
      name: 'createdAt',
      label: 'Fecha creación',
      options: {
        customBodyRender: (value: any) => {
          if (!value) return <></>;
          return (
            <>{moment(value).format('DD/MM/YYYY HH:mm:ss')}</>
          );
        },
      }
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        customBodyRender: (value: any, tableMeta: MUIDataTableMeta) => {
          const currData = (tableMeta.currentTableData[tableMeta.rowIndex] as any) as MUIDataTableData;
          const record = data[currData.index];
          return (
            <>
              {userDataInitialValues.permissions.includes('edit doctors') && (
                <IonButton style={buttonStyle}
                           slot="icon-only" fill="clear" size="small" color="gray50"
                           onClick={() => showModal(record)}>
                  <IonIcon icon={pencilSharp}/>
                </IonButton>
              )}
              {userDataInitialValues.permissions.includes('destroy doctors') && (
                <IonButton style={buttonStyle}
                           slot="icon-only" fill="clear" size="small" color="gray50"
                           onClick={() => deleteEntities(record.id)}>
                  <IonIcon icon={trashSharp}></IonIcon>
                </IonButton>
              )}
            </>
          );
        }
      }
    }
  ];

  return columns;
}

export default generateColumns;
