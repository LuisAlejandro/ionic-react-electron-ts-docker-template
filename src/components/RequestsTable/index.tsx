import { useState, useEffect } from 'react';
import {
  IonIcon,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonTitle,
  IonText,
} from '@ionic/react';
import {
  eyeSharp,
  refreshSharp,
  personSharp,
  closeSharp,
  trashSharp,
  fileTrayOutline,
  searchSharp
} from 'ionicons/icons';
import moment from 'moment';
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
  MUIDataTableData
} from 'mui-datatables';
import { Waypoint } from "react-waypoint";
import { ThemeProvider, StyledEngineProvider, Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import {
  createRequestsTableMuiTheme,
  requestsTableMuiThemeGenerator,
} from 'src/shared/common/themes';
import { setSearchStyles } from 'src/shared/common/styles';
import { formatRut } from 'src/shared/common/helpers';
import { RequestType } from 'src/shared/common/types';
import { userDataInitialValues } from 'src/shared/common/values';
import insolesIcon from 'src/assets/images/svg/insoles-icon.svg';
import insolesIconGray from 'src/assets/images/svg/insoles-icon-gray.svg';
import feetIcon from 'src/assets/images/svg/feet-icon.svg';
import feetIconGray from 'src/assets/images/svg/feet-icon-gray.svg';

import style from './style.module.scss';



declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}



type SubState = {
  data: RequestType[],
  mode: string,
  showRequestDetailsModal: (id: string) => void,
  refreshUserRequests: () => void,
  deleteRequest: (id: string) => void,
};

const RequestsTable = (props: SubState) => {

  const {
    data,
    mode,
    showRequestDetailsModal,
    refreshUserRequests,
    deleteRequest
  } = props;

  const [ searchText, setSearchText ] = useState<string>('');
  const [ rowsPerPage, setRowsPerPage ] = useState<number>(10);
  const [ requestsTableMuiTheme, setRequestsTableMuiTheme ] = useState<Theme>(createRequestsTableMuiTheme);
  
  const searchStyles = makeStyles(setSearchStyles)();
  
  const options: MUIDataTableOptions = {
    filterType: 'dropdown',
    responsive: 'standard',
    elevation: 0,
    print: false,
    download: false,
    filter: false,
    viewColumns: false,
    search: false,
    pagination: mode == 'full' ? true : false,
    searchText,
    customSearchRender: () => <IonTitle></IonTitle>,
    selectableRows: 'none',
    rowsPerPage,
    rowsPerPageOptions: [],
    enableNestedDataAccess: '.',
    textLabels: {
      pagination: {
        displayRows: "de",
      },
      body: {
        noMatch: "No se encontraron solicitudes",
      },
    },
    sortOrder: {
      name: 'createdAt',
      direction: 'desc'
    },
    setTableProps: () => {
      return {
        style: {
          marginBottom:  mode == 'full' ? '24px' : '10px',
          marginTop: mode == 'full' ? '64px' : '10px',
          width: mode == 'full' ? '96%' : '100%',
          marginLeft: mode == 'full' ? '2%' : '0',
          marginRight: mode == 'full' ? '2%' : '0',
        },
      }
    },
  };

  let columns: MUIDataTableColumn[] = [
    {
      name: "soleitId",
      label: "ID SOLEIT",
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
      name: 'patient.firstName',
      label: 'Nombres',
    },
    {
      name: 'patient.lastName',
      label: 'Apellidos',
    },
    {
      name: 'patient.idNumber',
      label: 'Rut/Pasaporte',
      options: {
        customBodyRender: (value: any) => (
          <>{formatRut(value)}</>
        ),
      }
    },
    {
      name: "doctor.name",
      label: "Doctor",
    },
    {
      name: "status.name",
      label: "Estado",
      options: {
        customBodyRender: (value: any) => {
          const color = value == 'Seguimiento' ? 'warning' :
                        value == 'Finalizada' ? 'success' :
                        value == 'Eliminada' ? 'gray30' :
                        'danger30';
          return (
            <IonChip color={color} className={style['status-chip']}>
              <IonLabel>{value}</IonLabel>
            </IonChip>
          );
        },
      }
    },
    {
      name: "createdAt",
      label: "Espera",
      options: {
        customBodyRender: (value: any) => {
          const days = moment().diff(moment(value), 'days');
          return (
            <IonChip color={days == 0 ? 'gray7' : (days <= 2 ? 'danger30' : 'danger')} className={style['wait-chip']}>
              <IonLabel>{days} días</IonLabel>
            </IonChip>
          )
        },
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
              {mode == 'full' &&
               userDataInitialValues.permissions.includes('view requests') && (
                <>
                  <IonButton className={style['table-button']}
                             slot="icon-only" fill="clear" size="small" color="gray50"
                             onClick={() => showRequestDetailsModal(record.id)}>
                    <IonIcon icon={eyeSharp} />
                  </IonButton>
                </>
              )}
              {record.patient &&
               userDataInitialValues.permissions.includes('view patients') && (
                <IonButton className={style['table-button']}
                           slot="icon-only" fill="clear" size="small" color="gray50"
                           routerLink={`/patients/profile/${record.patient.id}`}>
                  <IonIcon icon={personSharp} />
                </IonButton>
              )}
              {mode == 'full' &&
               record.status.name == 'Pendiente' &&
               userDataInitialValues.permissions.includes('destroy requests') && (
                <>
                  <IonButton className={style['table-button']}
                             slot="icon-only" fill="clear" size="small" color="gray50"
                             onClick={() => deleteRequest(record.id)}>
                    <IonIcon icon={trashSharp} />
                  </IonButton>
                </>
              )}
            </>
          );
        }
      }
    },
  ];

  if (mode == 'minimal') {
    columns = columns.map((column: MUIDataTableColumn) => {
      if (column) {
        if ('options' in column) {
          if (column.options) {
            column.options['customHeadRender'] = () => null;
          }
        } else {
          column['options'] = {
            customHeadRender: () => null
          };
        }
      }
      return column;
    });
    columns = columns.filter((column: MUIDataTableColumn) =>
      'name' in column && column.name != 'organization.name');
  }

  useEffect(() => {
    setRequestsTableMuiTheme(requestsTableMuiThemeGenerator(mode));
  }, [data, mode]);

  return (
    <div className={style['requests-table']}>
      {data.length === 0 ? (
        <div className={style['nodata']}>
          <IonIcon size="large" slot="start" color="gray7" icon={fileTrayOutline} />
          <IonText>Aún no se han ingresado solicitudes</IonText>
        </div>
      ) : (
        <>
          {mode == 'full' && (
            <div className={searchStyles.root}>
              <div className={searchStyles.searchContainer}>
                <div className={searchStyles.search}>
                  <div className={searchStyles.searchIcon}>
                    <IonIcon size="small" color="black" icon={searchSharp} />
                  </div>
                  <InputBase
                    placeholder="Buscar"
                    classes={{
                      input: searchStyles.inputInput,
                    }}
                    inputProps={{
                      'aria-label': 'Buscar',
                    }}
                    value={searchText}
                    onChange={(e: any) => setSearchText(e.target.value)} />
                  {searchText != '' && (
                    <div className={searchStyles.clearIcon}>
                      <IconButton
                        size="small"
                        onClick={() => setSearchText('')}>
                          <IonIcon icon={closeSharp} />
                      </IconButton>
                    </div>
                  )}
                </div>
              </div>
              <div className={searchStyles.refreshIcon}>
                <IconButton
                  size="small"
                  onClick={refreshUserRequests}>
                    <IonIcon icon={refreshSharp} />
                </IconButton>
              </div>
            </div>
          )}
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={requestsTableMuiTheme}>
              <MUIDataTable
                title={""}
                data={data}
                columns={columns}
                options={options} />
            </ThemeProvider>
          </StyledEngineProvider>
          {rowsPerPage < data.length && (
            <Waypoint bottomOffset="-20%" onEnter={() => setRowsPerPage(rowsPerPage + 10)} />
          )}
        </>
      )}
    </div>
  );
};

export default RequestsTable;
