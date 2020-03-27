import * as actionTypesModal from '../constants/action_type_modal';

export const showModal =(title, editing)=>{
    return {
        type: actionTypesModal.SHOW_MODAL,
        payload:{
            Title: title,
            Editing: editing
        }

    }
}
export const hideModal =()=>{
    return {
        type: actionTypesModal.HIDE_MODAL
    }
}