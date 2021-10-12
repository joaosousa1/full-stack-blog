import Navbar from './Navbar';
import Home from './Home';
import Info from './Info';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Login from './Login';
import Registrar from './Registrar';
import Modal from './Modal';
import Store from './Store'; //global state

function App() {

  return (
        <Store>
          <Router>
            <div className="App">
              <Navbar />
              <Modal />
              <div className="content">
                <Switch >
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/Info">
                    <Info />
                  </Route>
                  <Route path="/create">
                    <Create />
                  </Route>
                  <Route path="/post/:id">
                    <BlogDetails />
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/regist">
                    <Registrar />
                  </Route>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </div>
            </div>
          </Router>
        </Store>
  );

}

export default App;
