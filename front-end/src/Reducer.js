//global state ver Store.js
const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            //console.log(state)
            return {
                ...state,
                isLogin: action.payload.isLogin,
                userName: action.payload.userName
            };
        case 'SET_MODAL':
            //console.log(state)
            return {
                ...state,
                modalOpened: action.payload.modalOpened,
                modalTitle: action.payload.modalTitulo || "Mensagem", 
                modalTexto: action.payload.modalTexto || [],
                modalBtTexto: action.payload.modalBtTexto || "Fechar"
            };
        case 'SET_PAGE':
            //console.log(state)
            return {
                ...state,
                lastPage: action.payload.lastPage
            };
        default:
            return state;
    }
};

export default Reducer;