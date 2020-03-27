
import * as actionTypesUX from '../constants/action_type_ux';

export const showLoading= ()=>{
    return {
        type: actionTypesUX.SHOW_LOADING
    }
}
export const hideLoading= ()=>{
    return {
        type: actionTypesUX.HIDE_LOADING
    }
}