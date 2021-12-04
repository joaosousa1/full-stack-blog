import { useContext} from 'react';
import { Context } from './UserContext'

function Modal() { 

    const [state, setState] = useContext(Context);

    const handleCancel = () => {
        const m = { modalOpened: false }
        setState({ type: 'SET_MODAL', payload: m });

        if ( typeof state.modalActionCancel === "function" ){
        	state.modalActionCancel()
        }

    }

    const handleOk = () => {
        const m = { modalOpened: false }
        setState({ type: 'SET_MODAL', payload: m });
        //var m = { modalOk: true, modalCallBack: () => console.log("teste")}
        //m.modalCallBack()
        if ( typeof state.modalActionOk === "function" ){
        	state.modalActionOk()
        }

    }

    const modalSyle = () => {
        return state.modalOpened ? { display: "block" } : { display: "none" };
    }

    return (
        <>
            <div className="modalBg" style={modalSyle()}></div>
            <div className="modal" style={modalSyle()}>

                <h2>{state.modalTitulo}</h2>
                <div style={{ marginTop: "20px" }}>

                    {state.modalTexto.map((l, i) => (
                        <p key={i} >{l}</p> //cada linha tem um id para o react não mostrar erro na consola
                    ))}

                </div>
                <div className="linha bt-modal">

                    { state.modalBtTextoCancel !== undefined &&
                    <button className="bt" onClick={() => handleCancel()}>{state.modalBtTextoCancel}</button>
                    }

                
                    <button className="bt" onClick={() => handleOk()}>{state.modalBtTextoOk}</button>

                </div>

            </div>
        </>
    )
}

export default Modal
