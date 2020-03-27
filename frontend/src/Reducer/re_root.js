import { combineReducers } from 'redux';
import re_task from './re_task';
import re_ux from './re_ux';
import re_modal from './re_modal';
import re_logined_user from './re_logined_user';
// import { reducer as formReducer } from 'redux-form'
const root_reducer = combineReducers(
    {
        tasks : re_task,
        ux : re_ux,
        modal: re_modal,
        userLogined : re_logined_user
       
    }
)
export default root_reducer;