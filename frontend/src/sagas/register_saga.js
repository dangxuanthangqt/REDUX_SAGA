import { takeLatest, call, put, delay } from 'redux-saga/effects';
import * as action_type_register from '../constants/action_type_register';
import { registerRequest } from '../apis/register';
import * as action_ux from '../actions/ux';
import * as Toastify from '../Helpers/Toastify';

import getHistory from '../Helpers/History';
export function* register_saga() {

    yield takeLatest(action_type_register.REGISTER, watchRegister)
}
function* watchRegister(action) {
    yield put(action_ux.showLoading())
    try {
         yield call(registerRequest, action.payload)
        Toastify.toastifySuccess("Register successfully!");
        yield delay(500);
        yield call(getHistory().push,'/login')
        // yield put(actionCreatorRegister.registerSuccess())
    }catch(e){
        // yield put(actionCreatorRegister.registerError())
        Toastify.toastifyError("Register error!")
        
    }
    yield delay(500);
    yield put(action_ux.hideLoading())
}