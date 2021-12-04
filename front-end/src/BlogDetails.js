import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useContext, useState } from 'react';
import { url } from "./Url";
import { Context } from './UserContext'

const BlogDetails = () => {

  const [state, setState] = useContext(Context);

  const { id } = useParams();
  const { data, error, isPending } = useFetch(`${url}/posts/${id}`);
  const history = useHistory();
  const [editar, setEditar] = useState(false)
  const [texto, setTexto] = useState()
  const [titulo, setTitulo] = useState()
  //const [nextLoading, setNextLoading] = useState(false)

  const handleApagar = () => {

    fetch(`${url}/posts/${data[0]._id}`, {
      method: 'DELETE',
      credentials: 'include'
    }).then(() => {
      history.push('/');
    })
  }

  const handleClickApagar  = () => {
    const m = { modalOpened: true,
                modalTitulo: "Apagar",
                modalTexto: ["Tem certeza que pretende apagar?"],
                modalBtTextoOk: "Ok",
                modalBtTextoCancel: "Cancelar",
                modalActionOk: () => handleApagar()
              }
    setState({ type: 'SET_MODAL', payload: m });
  }

  const handleClickEditar = () => {
    setEditar(true)
    setTexto(data[0].body)
    setTitulo(data[0].title)
  }

  const handleClickSalvar = () => {
    data[0].body = texto
    data[0].title = titulo
    fetch(`${url}/posts/${data[0]._id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: titulo, body: texto })
    }).then(() => {
      setEditar(false)
      history.push(`/post/${data[0]._id}`); //nota endpoint da api é "posts" e no router uso o "post" 

    })

  }

  const handleClickCancelar = () => {
    setEditar(false)
    setTexto(data[0].body)
    setTitulo(data[0].title)
  }

  const handleClickVoltar = () => {
    setEditar(false)
    setTexto(data[0].body)
    setTitulo(data[0].title)
    history.goBack();
  }

  // const handleNextDoc = () => {

  //   setNextLoading(true)
  //   fetch(`${url}/next/${id}`, {
  //     method: 'GET',
  //     headers: { "Content-Type": "application/json" },
  //     credentials: 'include'

  //   }).then(response => {
  //     return response.json();
  //   }).then(data => {
  //     history.push('/post/' + data[0]._id);
  //     setNextLoading(false)
  //   })

  // }

  return (
    <>
      {isPending && <div className="loading"><div className="loader"></div></div>}

      <div className="blog-details">
        {error && <div>{error}</div>}
        {data && (

          <article>
            {!editar &&<h2>{data[0].title}</h2>}
            {editar &&
            <>
            <p>Titulo:</p>
            </>
            }



            {editar && state.isLogin &&
              <>
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
              </>
            }
            <p>Autor: {data[0].author}</p>
            
            <div className="linha">

              <div><button className="bt" onClick={handleClickVoltar}>Voltar</button></div>
              {state.isLogin &&
                <>
                  <div><button className="bt" onClick={handleClickApagar}>Apagar</button></div>
                  {!editar && <div><button className="bt" onClick={handleClickEditar} >Editar</button></div>}
                </>
              }
            </div>


            {!state.isLogin && <div>{data[0].body}</div>}


            {!editar && state.isLogin && <div>{data[0].body}</div>}
            {editar && state.isLogin &&
              <>
                <p>Texto:</p>
                <textarea required value={texto} onChange={(e) => setTexto(e.target.value)}></textarea>

                <div className="linha">
                  <div><button className="bt" onClick={handleClickSalvar}>Salvar</button></div>
                  <div><button className="bt" onClick={handleClickCancelar}>Cancelar</button></div>
                </div>

              </>}
          </article>
          
        )}
      </div>
    </>
  );
}

export default BlogDetails;
