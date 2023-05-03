import { Route, useLocation } from 'react-router-dom';
import { Landing, Home, Form, Detail, About } from './Components/indexcomponents' 
import './App.css';
//importamos en una sola linea, destructuring
import NavBar from './Components/NavBar/NavBar';
import axios from 'axios';
axios.defaults.baseURL = 'https://pi-pokemon-deploy-production.up.railway.app'
// https://pi-pokemon-deploy-production.up.railway.app/ Deploy
// http://localhost:3001 Localhost

function App() {

const location = useLocation();
//hook de React que permite acceder al objeto location que contiene información 
//acerca de la URL actual del navegador y la ubicación de la página. 
//Este objeto proporciona información como la ruta actual, 
//los parámetros de consulta, y el historial de navegación.
  return (
    <div className="App">
      {location.pathname !== '/' &&  <NavBar />}
      {/* renderiza el componente (NavBar) condicionalmente. */}
      {/* Esto quere decir que si la url  no es igual a "/" entonces renderice NavBar */}
      {/* Aqui abajo estan las rutas a renderizar  */}
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/detail/:id" component={Detail} />
      <Route exact path="/create" component={Form} />
      <Route exact path="/about" component={About} />

    </div>
  );
}

export default App;
