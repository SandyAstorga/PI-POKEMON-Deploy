import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';
// el BrowserRouter es un componente de React Router que permite al desarrollador 
// crear una aplicación de una sola página (SPA) con múltiples rutas 
// y transiciones suaves entre las diferentes vistas, todo esto en el contexto del navegador web.
import { Provider } from 'react-redux'; 
//El Provider es un componente de React-Redux que se utiliza para proporcionar el estado de la aplicación 
// a los componentes hijos, lo que permite que la información fluya de manera eficiente 
// a través de la aplicación y se actualice de manera reactiva en respuesta a las interacciones del usuario.
import store from './Redux/store';

ReactDOM.render(
  <Provider store={store}> 
  {/* El Provider acepta una propiedad "store", 
  que es una instancia del objeto store que se crea utilizando Redux. */}
  <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
