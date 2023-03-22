import './App.css';
import { Route } from 'react-router-dom';
import MyHome from './Components/HomePage/Home';
import MyLp from './Components/LandingPage/LandingPage'


function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <MyLp></MyLp>
      </Route>
      
      <Route path="/home">
        <MyHome></MyHome>
      </Route>
    </div>
  );
}

export default App;
