
import { takeLatest, call, put } from 'redux-saga/effects';
import { login } from '../apis/login';
import * as action_type_login from '../constants/action_type_login';
import { action_login_success } from '../actions/login';
import * as Toastify from '../Helpers/Toastify';

import * as LocalStorageService from '../Helpers/LocalStorageService';
import jwtDecode from 'jwt-decode';
//import getHistory from '../Helpers/History';
import getHistory from 'react-router-global-history';
import history from '../Helpers/HistoryVersion2';
export function* login_saga(){
    yield takeLatest(action_type_login.LOGIN, watchLogin )
}
function* watchLogin(action){
    try{
        const resp = yield call(login, action.payload.data)
       // console.log(resp)
        LocalStorageService.setAccessToken(resp.data.accessToken);
        //console.log(jwtDecode(resp.data.accessToken))
        const user = jwtDecode(resp.data.accessToken);
        yield put(action_login_success(user));
       // yield call(action.payload.history.push, '/task-board')
       // yield call(history.push, '/task-board')
        yield call(history.push,'/task-board')
       
     
    }catch(error){
        if(error.data.message)
        {
            Toastify.toastifyError(error.data.message)
        }else{
           
            Toastify.toastifyError(error.data)
        }
       
    }
        
    
    
    

}