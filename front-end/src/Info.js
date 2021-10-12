import { Link, useHistory } from "react-router-dom";
import { useContext } from 'react';
import { Context } from './Store'
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
    const m = { modalOpened: true, modalTitulo: "Olá", modalTexto: [d.toString()] }
    setState({ type: 'SET_MODAL', payload: m });

  }

  return (
    <div className="home">
      <div className="paginationBar">
        <Link className="bt" to="/">Ver posts</Link>
        <button className="bt" onClick={() => HandleUltimoPost()} >Último post</button>
        <button className="bt" onClick={() => HandleShowDia()} >Teste Modal</button>
      </div>
      <br/>
      <br/>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
}

export default Info;
