import { useContext } from 'react';
import { Context } from './Store'

function Modal() {

    const [state, setState] = useContext(Context);

    const closeModal = () => {
        const m = { modalOpened: false, modalTitle: "", modalTexto: [] }
        setState({ type: 'SET_MODAL', payload: m });

        //todo criar botoes aceitar cancelar confirmar
        if (state.modalBtTexto === "Aceitar Cookies") {
            localStorage.setItem("FrstOK", true);
        }
    }

    const modalSyle = () => {
        return state.modalOpened ? { display: "block" } : { display: "none" };
    }

    return (
        <>
            <div className="modalBg" style={modalSyle()}></div>
            <div className="modal" style={modalSyle()}>

                <h2>{state.modalTitle}</h2>
                <div style={{ marginTop: "20px" }}>

                    {state.modalTexto.map(l => (
                        <p>{l}</p>
                    ))}

                </div>
                <button className="bt bt-modal" onClick={closeModal}>{state.modalBtTexto}</button>

            </div>
        </>
    )
}

export default Modal
