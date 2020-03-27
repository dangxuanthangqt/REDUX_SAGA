
import { fork, call, put, delay, takeLatest, takeEvery } from 'redux-saga/effects';
import { getListTask, addTask, filterTask, deleteTask, editTask } from '../apis/task';
import * as actionTypes from '../constants/actionTypes';
import * as action_task from '../actions/task';
import * as action_ux from '../actions/ux';
import * as action_modal from '../actions/modal'
import { login_saga } from './login_saga';
import { register_saga } from './register_saga';
import { tasks_saga} from './tasks_saga';

function* root_saga() {

    yield fork(login_saga)
    yield fork(register_saga)
    yield fork(tasks_saga);
 
}
export default root_saga;