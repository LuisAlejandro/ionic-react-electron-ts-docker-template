import {
  IonIcon,
  IonButton,
} from '@ionic/react';
import {
  pencilSharp,
  trashSharp
} from 'ionicons/icons';
import moment from 'moment';
// import {
//   MUIDataTableColumn,
//   MUIDataTableData,
//   MUIDataTableMeta
// } from 'mui-datatables';

import { AdminOrganizationType } from 'src/pages/Admin/types';
import { userDataInitialValues } from 'src/shared/common/values';
import OrgLogo from 'src/assets/images/png/orglogo.png';


type SubState = {
  data: AdminOrganizationType[],
  showModal: (values: AdminOrganizationType) => void,
  deleteEntities: (id: string) => void,
};

type MUIDataTableColumn = any;
type MUIDataTableData = any;
type MUIDataTableMeta = any;

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
      name: "logo",
      label: "Logo",
      options: {
        customBodyRender: (value: any) => <img src={value || OrgLogo} style={{ height: '25px' }} />
      }
    },
    {
      name: "name",
      label: "Nombre de la Organización",
    },
    {
      name: "type",
      label: "Tipo",
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
              {userDataInitialValues.permissions.includes('edit organizations') && (
                <IonButton style={buttonStyle}
                           slot="icon-only" fill="clear" size="small" color="gray50"
                           onClick={() => showModal(record)}>
                  <IonIcon icon={pencilSharp}/>
                </IonButton>
              )}
              {userDataInitialValues.permissions.includes('destroy organizations') && (
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
