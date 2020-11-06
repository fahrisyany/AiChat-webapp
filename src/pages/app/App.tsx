import React from 'react';
import './App.scss';
import HomePage from '../home-page/HomePage'
import FavoritePage from '../favorite-page/FavoritePage'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ToastCustom from '../../components/toastCustom/ToastCustom'
import 'animate.css'
import logo from '../../images/movie-illustrations/logo.png'

const App: React.FC = () => {

  return (
    <Router>
      <div className="App">
        <Link to="/">
          <img className='logo' src={logo} alt="movie-poster" />
        </Link>
        <ToastCustom />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/favorites" component={FavoritePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
