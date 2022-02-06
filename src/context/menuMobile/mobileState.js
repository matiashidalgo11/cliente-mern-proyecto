import React, { useReducer } from "react";
import mobileReducer from "./mobileReducer";
import mobileContext from "./mobileContext";

import { MOSTRAR_MENU, OCULTAR_MENU } from "../../types";

const MobileState = props => {

    const initialState = {
        menuMobile: false
    }

    const [state, dispatch] = useReducer(mobileReducer, initialState);

    //Funciones
    const mostrarMenu = () => {
        dispatch({
            type: MOSTRAR_MENU
        })
    }

    const ocultarMenu = () => {
        dispatch({
            type: OCULTAR_MENU
        })
    }
    

    return(
        <mobileContext.Provider
            value={{
                menuMobile: state.menuMobile,
                mostrarMenu,
                ocultarMenu
            }}
        >

            {props.children}

        </mobileContext.Provider>
    )
}

export default MobileState;