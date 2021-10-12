import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useContext, useState } from 'react';
import { url } from "./Url";
import { Context } from './Store'

const BlogDetails = () => {

  const [state] = useContext(Context);

  const { id } = useParams();
  const { data, error, isPending } = useFetch(`${url}/posts/${id}`);
  const history = useHistory();
  const [editar, setEditar] = useState(false)
  const [texto, setTexto] = useState()
  //const [nextLoading, setNextLoading] = useState(false)

  const handleClickApagar = () => {

    fetch(`${url}/posts/${data[0]._id}`, {
      method: 'DELETE',
      credentials: 'include'
    }).then(() => {
      history.push('/');
    })
  }

  const handleClickEditar = () => {
    setEditar(true)
    setTexto(data[0].body)
  }

  const handleClickSalvar = () => {
    data[0].body = texto
    fetch(`${url}/posts/${data[0]._id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: data[0].title, body: texto })
    }).then(() => {
      setEditar(false)
      history.push(`/post/${data[0]._id}`); //nota endpoint da api é "posts" e no router uso o "post" 

    })

  }

  const handleClickCancelar = () => {
    setEditar(false)
    setTexto(data[0].body)
  }

  const handleClickVoltar = () => {
    setEditar(false)
    setTexto(data[0].body)
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
            <h2>{data[0].title}</h2>
            <p>Autor: {data[0].author}</p>

            <div className="linha">

              <div><button className="bt" onClick={handleClickVoltar}>Voltar</button></div>
              {state.isLogin &&
                <>
                  <div><button className="bt" onClick={handleClickApagar}>Apagar</button></div>
                </>
              }
            </div>


            {!state.isLogin && <div>{data[0].body}</div>}


            {!editar && state.isLogin && <div onClick={handleClickEditar}>{data[0].body}</div>}
            {editar && state.isLogin &&
              <>
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
