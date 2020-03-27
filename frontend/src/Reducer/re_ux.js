

import * as actionTypesUX from '../constants/action_type_ux';
const initialState={
    showLoading: false
}
const myReducer = (state=initialState, action)=>{
    switch (action.type) {
        case actionTypesUX.SHOW_LOADING:{
            return {
                ...state,
                showLoading: true
            }
        }
        case actionTypesUX.HIDE_LOADING:{
            return{
                ...state,
                showLoading:false
            }
        }    
        
    
        default:
            return {...state}
    }
}
export default myReducer;