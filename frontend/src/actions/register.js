
import * as action_type_register from '../constants/action_type_register';

export const register = (data) => {
    return {
        type: action_type_register.REGISTER,
        payload: data
    }
}
export const registerSuccess = () => {
    return {
        type: action_type_register.REGISTER_SUCCESS
    }
}
export const registerError =()=>{
    return {
        type: action_type_register.REGISTER_ERROR
    }
}