import React from 'react';
import './App.scss';
import HomePage from '../home-page/HomePage'
const App: React.FC = () => {
  return (
    <div className="App d-flex flex-column ">
      <HomePage/>
    </div>
  );
}

export default App;
