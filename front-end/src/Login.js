import { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"
import { url } from "./Url"
import {Context} from './Store'
 

const Login = () => {

  //const [ global, setGlobal ] = useContext(UserContext)
  const [state, setState] = useContext(Context);
  
  console.log(state.isLogin)

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [erromsg, setErromsg] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    const aut = { user, pass };

    fetch(`${url}/login`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aut),
      credentials: 'include'
    
    }).then(function (response) {
      return response.json();
    }).then( data => {
      const l = { isLogin: data.success , userName: data.userName}
      setState({type: 'SET_LOGIN', payload: l});
      // history.go(-1);
      if (data.success) {
        history.push('/');
      } else {
        setUser("")
        setPass("")
        setErromsg(data.message)
      }
    })
  }

  const handleFocus = (e) => {
    setErromsg("")
  }

  return (
    <div className="login-panel">
      <h2>Login</h2>
      <form onSubmit={handleLogin} onFocus={handleFocus}>
        <label>User:</label>
        <input 
          type="text"
          required 
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <label>Password:</label>
        <input type="password"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <button className="bt" >Login</button>
      </form>
      <Link to="/regist"><button className="bt" >Novo utilizador</button></Link>
      <br/>
      { erromsg !== "" && <div className="erros">{erromsg}</div>}
    </div>
  );
}
 
export default Login;
