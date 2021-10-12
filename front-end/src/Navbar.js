import { Link } from "react-router-dom";
import { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { url } from "./Url"
import { Context } from './Store'

function Navbar() {

  const [state, setState] = useContext(Context);
  const history = useHistory();

  const handleLogout = (e) => {

    fetch(`${url}/logout`, {
      method: 'GET',
      redirect: "follow",
      credentials: 'include' // <--- 
    })

    const l = { isLogin: false, userName: "" }
    setState({ type: 'SET_LOGIN', payload: l });
    history.push('/login');

  }

  const handleHome = (e) => {

    setState({ type: 'SET_PAGE', payload: { lastPage: 1 } });
    history.push('/');

  }

  return (
    <nav className="navbar">
      <div className="navbarC">
        <a href="https://tuxmind.blogspot.com" target="_blank" rel="noreferrer"><h1 id="tilte" >Blog</h1></a>
        <div className="links">
          {/* <Link to="/">Home</Link> */}
          <button className="bt" onClick={handleHome}>Home</button>
          {state.isLogin && <Link to="/create">Novo Post</Link>}
          {!state.isLogin ? <Link className="bt-nav" to="/login">Login</Link> : <div className="bt-nav" onClick={handleLogout}>Logout <span className="bt-separa">|</span> {state.userName}</div>}</div>
      </div>
    </nav>
  );
}

export default Navbar;