//global state ver Store.js
const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOGIN':

            return {
                ...state,
                isLogin: action.payload.isLogin,
                userName: action.payload.userName
            };
        case 'SET_MODAL':

            return {
                ...state,
                modalOpened: action.payload.modalOpened || false,
                modalTitulo: action.payload.modalTitulo || "Mensagem", 
                modalTexto: action.payload.modalTexto || [],
                modalBtTextoCancel: action.payload.modalBtTextoCancel || undefined,
                modalBtTextoOk: action.payload.modalBtTextoOk || "Ok",
                modalActionCancel: action.payload.modalActionCancel || undefined,
                modalActionOk: action.payload.modalActionOk || undefined
            };
        case 'SET_PAGE':

            return {
                ...state,
                lastPage: action.payload.lastPage
            };
        default:
            return state;
    }
};

export default Reducer;