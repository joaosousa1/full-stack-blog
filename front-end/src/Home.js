import BlogList from "./BlogList";
import { useState, useEffect } from 'react';
import { url } from "./Url";
import { useContext } from 'react';
import { Context } from './Store'
//import { useParams } from "react-router-dom";


const Home = () => {

  const [state, setState] = useContext(Context); //global state

  //const { p, l } = useParams(); //parametros na url
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(state.lastPage);
  //const [pageNumber, setPageNumber] = useState(1);
  //const [pageNumber, setPageNumber] = useState(parseInt(p));
  //const [itensLimit ] = useState(parseInt(l));
  const [itensLimit] = useState(5);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);


  

  useEffect(() => {

    const abortCont = new AbortController();

    setIsPending(true)

    setTimeout(() => {
      fetch(`${url}/posts/${pageNumber}/${itensLimit}`)
        .then((response) => response.json())
        .then(({ total, results }) => { //destruturing via response
          setIsPending(false)
          setPosts(results);
          setNumberOfPages(Math.ceil(total / itensLimit))
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
            // auto catches network / connection error
            setIsPending(false);
            //setError(err.message);
            setError("Não foi possível fazer a requesição fetch ");
          }
        });
    }, 500);

    setState({ type: 'SET_PAGE', payload: { lastPage: pageNumber } });

    const msg = [
      "Bla Bla Bla cookies.",
      " ",
      "Politica de privacidade e termos de utilização.",
      " ",
      "Ao clicar em \"Aceitar\" está a aceitar os termos e condições, e consente o uso dos cookies."
    ];


    if (localStorage.getItem("FrstOK") === null) {
      setTimeout(() => {
        setState({
          type: 'SET_MODAL',
          payload: {
            modalOpened: true,
            modalTitulo: "Cookies",
            modalTexto: msg,
            modalBtTexto: "Aceitar Cookies"
          }
        });

      }, 3000);

    }

    ///////////////////////////////////////////////////////////////////
    fetch(`${url}/status`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: 'include'

    }).then(function (response) {
      return response.json();
    }).then(data => {
      const l = { isLogin: data.success, userName: data.userName }
      setState({ type: 'SET_LOGIN', payload: l });
    })
    ///////////////////////////////////////////////////////////////////

    return () => abortCont.abort();

  }, [pageNumber, itensLimit, setState ]); //sempre que alteramos o pageNumber number ele faz request

  const gotoPrevious = () => {
    setPageNumber(Math.max(1, pageNumber - 1));

  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages, pageNumber + 1));
  };

  return (
    <div className="home">
      {!isPending && <h2>Pagina {pageNumber} de {numberOfPages} </h2>}
      {error && <div className="erros" >{error}</div>}
      {isPending && <div className="loading"><div className="loader"></div></div>}
      {posts && !error && !isPending && <BlogList blogs={posts} />}

      {!isPending && !error && <div className="paginationBar">
        {pageNumber !== 1 && <button className="bt" onClick={() => setPageNumber(1)}>Página 1</button>}
        {pageNumber !== 1 && <button className="bt" onClick={gotoPrevious}>← Anterior</button>}
        {pages.map((pageIndex) => (

          <button className="bt" key={pageIndex} onClick={() => setPageNumber(pageIndex + 1)}>
            {pageIndex + 1}
          </button>

        ))}
        {pageNumber !== numberOfPages && <button className="bt" onClick={gotoNext}>Próxima →</button>}
        {pageNumber !== numberOfPages && <button className="bt" onClick={() => setPageNumber(numberOfPages)}>Última página</button>}
      </div>}

    </div>
  );
}

export default Home;