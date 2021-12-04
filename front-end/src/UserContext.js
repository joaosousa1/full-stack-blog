import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'

const initialState = {
    isLogin: false,
    userName: "anónimo",
    modalOpened: false,
    modalTitulo: "Modal",
    modalTexto: [],
    modalBtTextoCancel: undefined,
    modalBtTextoOk: "OK",
    modalActionCancel: undefined,
    modalActionOk: undefined,
    lastPage: 1
};

const UserContext = ({children}) => {
    const [state, setState] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState); 
export default UserContext; //o App.js importa