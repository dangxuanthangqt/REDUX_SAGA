
import * as action_type_login from '../constants/action_type_login';

export const action_login =(data, history)=>{
    return {
        type: action_type_login.LOGIN,
        payload: { data, history}
    }
}
export const action_login_success =(user)=>{
    return {
        type: action_type_login.LOGIN_SUCCESS,
        payload: user
    }
}