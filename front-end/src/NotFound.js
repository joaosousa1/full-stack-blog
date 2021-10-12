import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Erro!</h2>
      <p>A página que procura não existe.</p>
      <Link className="bt" to="/">Voltar à pagina principal...</Link>
    </div>
  );
}
 
export default NotFound;