import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'

const initialState = {
    isLogin: false,
    userName: "anónimo",
    modalOpened: false,
    modalTitulo: "Modal",
    modalTexto: [],
    modalBtTexto: "Fechar",
    lastPage: 1
};

const Store = ({children}) => {
    const [state, setState] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;