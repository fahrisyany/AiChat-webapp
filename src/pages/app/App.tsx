import React from 'react';
import './App.scss';
import HomePage from '../home-page/HomePage'
import FavoritePage from '../favorite-page/FavoritePage'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import ToastCustom from '../../components/toastCustom/ToastCustom'
import 'animate.css'

const App: React.FC = () => {

  return (
    <Router>
      <div className="App">
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
