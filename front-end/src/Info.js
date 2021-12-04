import { Link, useHistory } from "react-router-dom";
import { useContext } from 'react';
import { Context } from './UserContext'
import { url } from "./Url";

const Info = () => {

  const [state, setState] = useContext(Context);

  console.log(state.isLogin)

  const history = useHistory();

  const HandleUltimoPost = () => {

    fetch(`${url}/lastPost`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: 'include'

    }).then(response => {
      return response.json();
    }).then(data => {
      history.push('/post/' + data[0]._id);
    })

  }

  const HandleShowDia = (e) => {
    const d = new Date()
    const m = { modalOpened: true,
                modalTitulo: "Data",
                modalTexto: [d.toString()],
                modalBtTextoOk: "Ok"
              }
    setState({ type: 'SET_MODAL', payload: m });

  }

  const HandlePergunta = () => {
    const m = { modalOpened: true,
                modalTitulo: "Apagar",
                modalTexto: ["Tem certeza que pretende apagar?"],
                modalBtTextoOk: "Ok",
                modalBtTextoCancel: "Cancelar",
                modalActionCancel: () => alert("Respondeu Cancelar"),
                modalActionOk: () => alert("Respondeu Ok")
              }
    setState({ type: 'SET_MODAL', payload: m });
  }

  return (
    <div className="home">
      <div className="paginationBar">
        <Link className="bt" to="/">Ver posts</Link>
        <button className="bt" onClick={() => HandleUltimoPost()} >Último post</button>
        <button className="bt" onClick={() => HandleShowDia()} >Modal Dia</button>
        <button className="bt" onClick={() => HandlePergunta()} >Pergunta</button>
      </div>
      <br/>
      <br/>
      <p style={{wordBreak: "break-all"}} >login: <span className="importante">{JSON.stringify(state.isLogin)}</span></p>
      <p style={{wordBreak: "break-all"}} >user name: <span className="importante">{JSON.stringify(state.userName)}</span></p>
      <p style={{wordBreak: "break-all"}} >modal: <span className="importante">{JSON.stringify(state.modalOpened)}</span></p>
      <p style={{wordBreak: "break-all"}} >modal titulo: <span className="importante">{JSON.stringify(state.modalTitulo)}</span></p>
      <p style={{wordBreak: "break-all"}} >modal bt ok texto: <span className="importante">{JSON.stringify(state.modalBtTextoOk)}</span></p>
      <p style={{wordBreak: "break-all"}} >modal bt cancel texto: <span className="importante">{JSON.stringify(state.modalBtTextoCancel)}</span></p>
      <p style={{wordBreak: "break-all"}} >modal bt cancel action: <span className="importante">{JSON.stringify(state.modalActionCancel)}</span></p>
      <p style={{wordBreak: "break-all"}} >modal bt ok action: <span className="importante">{JSON.stringify(state.modalActionOk)}</span></p>
      <p style={{wordBreak: "break-all"}} >última pasta: <span className="importante">{JSON.stringify(state.lastPage)}</span></p>
      <br />
      <br />
      <p style={{wordBreak: "break-all"}} >{JSON.stringify(state)}</p>
      
    </div>
  );
}

export default Info;
