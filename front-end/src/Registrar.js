import { useState } from "react";
import { useHistory } from "react-router-dom";
import { url } from "./Url"

const Registrar = () => {
  const [newUser, setNewUser] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserPassCheck, setNewUserPassCheck] = useState('');
  const [erromsg, setErromsg] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    if (newUserPass === newUserPassCheck) {

      const aut = { newUser, newUserPass };

      fetch(`${url}/regist`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aut)
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          setErromsg(JSON.stringify(data.message));
          if (data.success === true) {
            // history.go(-1);
            history.push('/');
          }
        })

    } else {
      setErromsg("A password não está igual")
      setNewUser("")
      setNewUserPass("")
      setNewUserPassCheck("")
    }

  }

  const handleFocus = (e) => {
    setErromsg("")
  }

  return (
    <div className="login-panel">
      <h2>Registrar</h2>
      <form onSubmit={handleLogin} onFocus={handleFocus}>
        <label>User:</label>
        <input
          type="text"
          required
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <label>Password:</label>
        <input type="password"
          required
          value={newUserPass}
          onChange={(e) => setNewUserPass(e.target.value)}
        ></input>
        <label>Repita a password:</label>
        <input type="password"
          required
          value={newUserPassCheck}
          onChange={(e) => setNewUserPassCheck(e.target.value)}
        ></input>
        <button className="bt" >Registrar</button>
      </form>
      { erromsg !== "" && <div className="erros">{erromsg}</div>}

    </div>
  );
}

export default Registrar;
