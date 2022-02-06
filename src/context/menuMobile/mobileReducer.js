import { MOSTRAR_MENU, OCULTAR_MENU } from "../../types";

const mobileReducer =  (state, action) => {
    switch(action.type){

        case MOSTRAR_MENU:
            return {

                menuMobile: true
            }
        
        case OCULTAR_MENU:
            return {

                menuMobile: false
            }

        default:
            return state;
    }
}

export default mobileReducer;