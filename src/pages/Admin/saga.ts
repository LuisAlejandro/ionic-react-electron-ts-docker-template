import { takeLatest, call, put } from 'redux-saga/effects';

import { Actions } from './constants';
import { adminService } from './services';
import { adminActions, alertActions } from './actions';


function* getOrganizationsRequestSaga(action: any) {
  try {
    const organizationsList: Response = yield call(adminService.getOrganizations,
                                                   action.payLoad.email,
                                                   action.payLoad.token);
    yield put(adminActions.getOrganizationsSuccess({ organizationsList }));
  } catch (err: any) {
    yield put(alertActions.setAlert({
      alertMessage: err.message,
    }));
  }
}

function* getRolesRequestSaga(action: any) {
  try {
    const rolesList: Response = yield call(adminService.getRoles,
                                           action.payLoad.email,
                                           action.payLoad.token);
    yield put(adminActions.getRolesSuccess({ rolesList }));
  } catch (err: any) {
    yield put(alertActions.setAlert({
      alertMessage: err.message,
    }));
  }
}

function* getEntitiesRequestSaga(action: any) {
  try {
    const entitiesList: Response = yield call(adminService.getEntities,
                                              action.payLoad.type,
                                              action.payLoad.email,
                                              action.payLoad.token);
    yield put(adminActions.getEntitiesSuccess({ entitiesList }));
  } catch (err: any) {
    yield put(alertActions.setAlert({
      alertMessage: err.message,
    }));
  }
}

function* createEntitiesRequestSaga(action: any) {
  try {
    const createdEntity: Response = yield call(adminService.createEntities,
                                               action.payLoad.type,
                                               action.payLoad.email,
                                               action.payLoad.token,
                                               action.payLoad.values);
    yield put(adminActions.createEntitiesSuccess({ createdEntity }));
    yield put(alertActions.setAlert({
      alertMessage: 'Creación exitosa',
    }));
  } catch (err: any) {
    yield put(alertActions.setAlert({
      alertMessage: err.message,
    }));
  }
}

function* updateEntitiesRequestSaga(action: any) {
  try {
    const updatedEntity: Response = yield call(adminService.updateEntities,
                                               action.payLoad.type,
                                               action.payLoad.email,
                                               action.payLoad.token,
                                               action.payLoad.id,
                                               action.payLoad.values);
    yield put(adminActions.updateEntitiesSuccess({ updatedEntity }));
    yield put(alertActions.setAlert({
      alertMessage: 'Actualización exitosa',
    }));
  } catch (err: any) {
    yield put(alertActions.setAlert({
      alertMessage: err.message,
    }));
  }
}

function* deleteEntitiesRequestSaga(action: any) {
  try {
    const deletedEntity: Response = yield call(adminService.deleteEntities,
                                               action.payLoad.type,
                                               action.payLoad.email,
                                               action.payLoad.token,
                                               action.payLoad.id);
    yield put(adminActions.deleteEntitiesSuccess({ deletedEntity }));
    yield put(alertActions.setAlert({
      alertMessage: 'Eliminación exitosa',
    }));
  } catch (err: any) {
    yield put(alertActions.setAlert({
      alertMessage: err.message,
    }));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield takeLatest(Actions.ORGANIZATIONS_REQUEST, getOrganizationsRequestSaga);
  yield takeLatest(Actions.ROLES_REQUEST, getRolesRequestSaga);
  yield takeLatest(Actions.ENTITIES_REQUEST, getEntitiesRequestSaga);
  yield takeLatest(Actions.CREATE_ENTITIES_REQUEST, createEntitiesRequestSaga);
  yield takeLatest(Actions.UPDATE_ENTITIES_REQUEST, updateEntitiesRequestSaga);
  yield takeLatest(Actions.DELETE_ENTITIES_REQUEST, deleteEntitiesRequestSaga);
}
