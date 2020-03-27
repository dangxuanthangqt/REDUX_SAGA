// import * as apiTasks from '../apis/task';
import * as actionTypes from '../constants//actionTypes';
// export const fetchListTask_Request = () => {
//     return (dispatch) => {
//         apiTasks.getListTask()
//         .then(res => {
//             dispatch(fetchListTask(res.data))
//             console.log(res)
//         }).catch(err => {
//             console.log(err)
//             dispatch(fetchListTask_error(err))
            
//         })
//     }
// }
export const fetchListTask =()=>{
    return {
        type : actionTypes.FETCH_LIST_TASK
    }
}
export const fetchListTask_success =(data)=>{
    return {
        type : actionTypes.FETCH_LIST_TASK_SUCCESS,
        payload: data

    }
}
export const fetchListTask_error =(err)=>{
    return {
        type : actionTypes.FETCH_LIST_TASK_ERROR,
        payload: err
    }
}
export const filterTask =(value)=>{
    return {
        type: actionTypes.FILTER_TASK,
        payload:  value
        
    }
}
export const filterTaskSuccess =(data)=>{
    return{
        type: actionTypes.FILTER_TASK_SUCCESS,
        payload: data
    }
}
// ------------------------------------------------------
export const addTask =(data)=>{
    return {
        type :actionTypes.ADD_TASK,
        payload: data
    }
}
export const addTaskSuccess=(data)=>{
    return {
        type :actionTypes.ADD_TASK_SUCCESS,
        payload:data
    }
}
export const addTaskFail=()=>{
    return {
        type: actionTypes.ADD_TASK_FAIL
    }
}
//-----------------------------------------------------------

export const deleteTask=(id)=>{
    return {
        type: actionTypes.DELETE_TASK,
        payload:id
    }
}
export const deleteTaskSuccess=(list_tasks)=>{
    return {
        type:actionTypes.DELETE_TASK_SUCCESS,
        payload:list_tasks
    }
}
export const deleteTaskFail=()=>{
    return {
        type:actionTypes.DELETE_TASK_FAIL
    }
}


export const editTask=(data)=>{
    return {
        type: actionTypes.EDIT_TASK,
        payload:data
    }
}
export const editTaskSuccess=(data)=>{
    return {
        type: actionTypes.EDIT_SUCCESS,
        payload:data
    }
}
export const editTaskFail=()=>{
    return {
        type:actionTypes.EDIT_TASK_FAIL
    }
}