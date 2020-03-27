
import * as actionTypes from '../constants/actionTypes';
import * as toastify from '../Helpers/Toastify';
import { element } from 'prop-types';
const initState ={
    list_tasks : [],
   change: false
    
};
const myReducer =(state = initState, action)=>{
    switch (action.type) {
        case actionTypes.FETCH_LIST_TASK:{
            return {...state}
        }
        case actionTypes.FETCH_LIST_TASK_SUCCESS:{
            const data = action.payload;
            toastify.toastifySuccess("Load data successfully")
            return Object.assign({}, state, {list_tasks : data})
        }
        case actionTypes.FETCH_LIST_TASK_ERROR :{
            const error = action.payload;
          //  toastify.toastifyError(error.message)
            return  Object.assign({}, state)
        }
        case actionTypes.FILTER_TASK_SUCCESS :{
            const data = action.payload;
            return{
                ...state,
                list_tasks : data
            }
        }
        case actionTypes.ADD_TASK_SUCCESS:{
            toastify.toastifySuccess("Thêm thành công !")
            const {payload}= action;
            return Object.assign({},state,{ list_tasks : payload})
        }
        case actionTypes.ADD_TASK_FAIL:{
            toastify.toastifyError("Thêm thất bại!")
            return {
                ...state
            }
        }

        case actionTypes.DELETE_TASK_SUCCESS:{
            toastify.toastifySuccess("Delete task item successfully !")
            const {payload} = action;
            return {
                ...state,
                list_tasks: payload
            }
        }
        case actionTypes.DELETE_TASK_FAIL:{
            toastify.toastifyError("Delete task item fail !")
            return {
                ...state
            }
        }
        case actionTypes.EDIT_SUCCESS :{
            toastify.toastifySuccess("Edit Task successfully !");
            console.log(action.payload)
            var {_id, title, description, status} = action.payload;
            var cloneState = {...state};
            cloneState.list_tasks.forEach((element, index)=>{
                if(element._id === _id){
                    console.log("Dang xuan thang")
                    cloneState.list_tasks.splice(index, 1 ,{
                        _id : _id,
                        title: title,
                        description: description,
                        status : parseInt(status)
                    })
                }
            })

           
            return {
                ...state,
                change : !state.change,
                 list_tasks: cloneState.list_tasks
               //  list_tasks: [...cloneState.list_tasks],
            }
                
        }
        case actionTypes.EDIT_TASK_FAIL:{
            toastify.toastifyError("Edit task fail !!")
            return{
                ...state
            }
        }

        default:
            return {...state}
    }
}
export default myReducer;