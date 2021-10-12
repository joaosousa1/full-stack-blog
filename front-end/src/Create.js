import { useState } from "react";
import { useHistory } from "react-router-dom";
import { url } from "./Url"
 
const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body };

    fetch(`${url}/posts/`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(blog)
    }).then(() => {
      history.push('/');
    })
  }

  const handleCancelar = (e) => {
    e.preventDefault();
    history.goBack();
  }

  return (
    <div className="create">
      <h2>Novo Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Titulo:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Texto:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <div className="linha">
          <button className="bt" >Publicar</button>
          <button className="bt" onClick={handleCancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
 
export default Create;
