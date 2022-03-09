import { useState } from 'react';
import {
  IonIcon,
  IonTitle,
  IonText,
} from '@ionic/react';
import {
  refreshSharp,
  closeSharp,
  fileTrayOutline,
  searchSharp
} from 'ionicons/icons';
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumn } from 'mui-datatables';
import { ThemeProvider } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import {
  AdminCreateUserType,
  AdminEntityType,
  AdminOrganizationType,
} from 'src/pages/Admin/types';
import { setSearchStyles } from 'src/shared/common/styles';
import { adminTableTheme } from 'src/shared/common/themes';

import { default as organizationsColumns } from './columns/organizations';
import { default as usersColumns } from './columns/users';

import style from './style.module.scss';


type SubState = {
  type: string,
  data: AdminEntityType[],
  showModal: (values: AdminEntityType) => void,
  deleteEntities: (id: string) => void,
  refreshEntities: () => void,
};

const AdminTables = (props: SubState) => {

  const {
    type,
    data,
    showModal,
    deleteEntities,
    refreshEntities
  } = props;
  
  const [ searchText, setSearchText ] = useState('');
  const [ rowsPerPage, setRowsPerPage ] = useState<number>(20);
  
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
    pagination: true,
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
          marginBottom:  '24px',
          marginTop: '64px',
          width: '96%',
          marginLeft: '2%',
          marginRight: '2%',
        },
      }
    },
  };

  const {
    title,
    columns,
  } : {
    title: string,
    columns: MUIDataTableColumn[],
  } = type == 'organizations' ? {
    title: 'organizaciones',
    columns: organizationsColumns({ data: data as AdminOrganizationType[], showModal, deleteEntities }),
  } : type == 'materials' ? {
    title: 'materiales',
    columns: materialsColumns({ data: data as AdminMaterialType[], showModal, deleteEntities }),
  } : type == 'terminations' ? {
    title: 'terminaciones',
    columns: terminationsColumns({ data: data as AdminTerminationType[], showModal, deleteEntities }),
  } : type == 'devices' ? {
    title: 'equipos',
    columns: devicesColumns({ data: data as AdminDeviceType[], showModal, deleteEntities }),
  } : type == 'doctors' ? {
    title: 'doctores',
    columns: doctorsColumns({ data: data as AdminDoctorType[], showModal, deleteEntities }),
  } : type == 'pickupaddresses' ? {
    title: 'direcciones',
    columns: pickupaddressesColumns({ data: data as AdminPickupAddressType[], showModal, deleteEntities }),
  } : type == 'patients' ? {
    title: 'pacientes',
    columns: patientsColumns({ data: data as AdminPatientType[], showModal, deleteEntities }),
  } : {
    title: 'usuarios',
    columns: usersColumns({ data: data as AdminCreateUserType[], showModal, deleteEntities }),
  };

  return <>
    {data.length === 0 ? (
      <div className={style['admin-tables']}>
        <div className={style['nodata']}>
          <IonIcon size="large" slot="start" color="gray7" icon={fileTrayOutline} />
          <IonText>Aún no se han ingresado {title}</IonText>
        </div>
      </div>
    ) : (
      <>
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
              onClick={refreshEntities}>
              <IonIcon icon={refreshSharp} />
            </IconButton>
          </div>
        </div>
        <ThemeProvider theme={adminTableTheme}>
          <MUIDataTable
            title={""}
            data={data}
            columns={columns}
            options={options} />
        </ThemeProvider>
      </>
    )}
  </>;
};

export default AdminTables;
