
import { fork, call, put, delay, takeLatest, takeEvery } from 'redux-saga/effects';
import { getListTask, addTask, filterTask, deleteTask, editTask } from '../apis/task';
import * as actionTypes from '../constants/actionTypes';
import * as action_task from '../actions/task';
import * as action_ux from '../actions/ux';
import * as action_modal from '../actions/modal'
import { login_saga } from './login_saga';
import { register_saga } from './register_saga';

export function* tasks_saga(){
    yield takeEvery(actionTypes.FETCH_LIST_TASK,watcherFetchListTask);
    yield takeLatest(actionTypes.FILTER_TASK, watcherFilterTask)
    yield takeLatest(actionTypes.ADD_TASK, addTaskSaga)
    yield takeLatest(actionTypes.DELETE_TASK, watcherDeleteTask)
    yield takeLatest(actionTypes.EDIT_TASK, watcherEditTask)
}
function* watcherFetchListTask() {

    yield put(action_ux.showLoading());
    try {
        const resp = yield call(getListTask);
        console.log(resp)
        yield put(action_task.fetchListTask_success(resp.data));
    }
    catch (e) {
       console.log(e);
        yield put(action_task.fetchListTask_error(e));
    }
    yield delay(1000);
    yield put(action_ux.hideLoading());


}
function* watcherFilterTask({ payload }) {
    yield delay(500)
    const keyword = payload;
    console.log(keyword.length)
    try {
        var resp = yield call(filterTask, keyword)
        console.log(resp.data)
        yield put(action_task.filterTaskSuccess(resp.data))
    } catch (E) {

    }
    //yield put(action_task.filterTaskSuccess(data))

}

function* addTaskSaga({ payload }) {

    yield put(action_ux.showLoading());
    try {
        const resp = yield call(addTask, payload)
        console.log(resp)
        yield put(action_task.addTaskSuccess(resp.data))

    }
    catch (e) {
        yield put(action_task.addTaskFail())
    }
    //const respGET = yield call(getListTask)


    yield delay(1000);
    yield put(action_ux.hideLoading());
}
function* watcherDeleteTask({ payload }) {
    yield put(action_ux.showLoading())
    console.log(payload)
    try {
        const resp = yield call(deleteTask, payload)
        //console.log(resp);
        yield put(action_task.deleteTaskSuccess(resp.data))
    } catch (e) {
        console.log(e);
        yield put(action_task.deleteTaskFail())
    }
    yield delay(500);
    yield put(action_ux.hideLoading())
}
function* watcherEditTask({ payload }) {
    yield put(action_ux.showLoading())
    try {
        
        yield call(editTask, payload);
        //const resp = yield call(getListTask);
        yield put(action_task.editTaskSuccess(payload))
        yield put(action_modal.hideModal())

    } catch (e) {
        yield put(action_task.editTaskFail())
        yield put(action_modal.hideModal())
    }
    yield delay(500);
    yield put(action_ux.hideLoading())

}

