import {
  IonIcon,
  IonButton,
  IonChip,
  IonLabel,
} from '@ionic/react';
import {
  addCircleOutline,
  closeCircleOutline,
  createOutline,
  eyeOutline,
  pencilSharp,
  trashSharp
} from 'ionicons/icons';
import moment from 'moment';
// import {
//   MUIDataTableColumn,
//   MUIDataTableData,
//   MUIDataTableMeta
// } from 'mui-datatables';

import { AdminPermissionType, AdminRoleType } from 'src/pages/Admin/types';
import { userDataInitialValues } from 'src/shared/common/values';


type SubState = {
  data: AdminRoleType[],
  showModal: (values: AdminRoleType) => void,
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
  
  const chipStyle = {
    fontSize: '12px',
    paddingInline: '5px',
    marginInline: '2px',
    margin: '4px',
    padding: '4px 12px',
    height: 'auto',
    pointerEvents: 'none',
  };

  const columns: MUIDataTableColumn[] = [
    {
      name: "name",
      label: "Nombre del Rol",
    },
    {
      name: "permissions",
      label: "Permisos",
      options: {
        customBodyRender: (value: any) => {
          if (!value) return <></>;
          return (
            <>
              {value && value.length > 0 && value.map((permission: AdminPermissionType) => {
                let chipIcon;
                const verb = permission.name.split(' ')[0];
                switch (verb) {
                  default:
                  case 'view':
                    chipIcon = eyeOutline;
                    break;
                  case 'create':
                    chipIcon = addCircleOutline;
                    break;
                  case 'edit':
                    chipIcon = createOutline;
                    break;
                  case 'destroy':
                    chipIcon = closeCircleOutline;
                    break;
                }
                return (
                  <IonChip style={chipStyle}>
                    <IonIcon color="black" icon={chipIcon} />
                    <IonLabel color="black">{permission.name}</IonLabel>
                  </IonChip>
                );
              })}
            </>
          );
        },
      }
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
