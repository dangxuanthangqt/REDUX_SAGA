

import * as action_type_login from '../constants/action_type_login';

const initialState ={};
var myReducer = (state = initialState, action)=>{
    switch (action.type) {
        case action_type_login.LOGIN_SUCCESS:
          var userLogined = action.payload;
          console.log(userLogined);
          return {
              ...userLogined
          }
            
    
        default:
            return {
                ...state
            }
    }
}
export default myReducer;