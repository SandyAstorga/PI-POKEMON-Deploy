import './App.css';
import { Route, useLocation } from 'react-router-dom';
import { MyHome, MyLp, MyDt, MyFrm } from './Components' 
//importamos en una sola linea, destructuring
import NavBar from './Components/NavBar/NavBar';

function App() {

const location = useLocation();
//hook de React que permite acceder al objeto location que contiene información 
//acerca de la URL actual del navegador y la ubicación de la página. 
//Este objeto proporciona información como la ruta actual, 
//los parámetros de consulta, y el historial de navegación.
  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}
      {/* renderiza el componente (NavBar) condicionalmente. */}
      <Route exact path="/" component={MyLp} />
      <Route path="/home" component={MyHome} />
      <Route path="/detail" component={MyDt} />
      <Route path="/create" component={MyFrm} />
    </div>
  );
}

export default App;
