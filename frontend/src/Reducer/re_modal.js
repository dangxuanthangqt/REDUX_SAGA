
import * as actionTypesModal from '../constants/action_type_modal';

const initialState = {
    Show : false,
    Title:"",
    Editing: null
  
} 

const myReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypesModal.SHOW_MODAL:
            {
              
                var {Title, Editing} = action.payload;
                return {
                    ...state, 
                    Show: true,
                    Title : Title,
                    Editing: Editing
                }
            }
        case actionTypesModal.HIDE_MODAL:
            {
                return {
                    ...state, 
                   Show : false,
                   Title:"",
                   Editing:null
                }
            }
            
    
        default:
            return {
                ...state
            }
    }
}
export default myReducer;