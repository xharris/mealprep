import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { getWelcomeText } from '@front/db';

function App() {
  const [ welcomeText, setWelcomeText ] = useState("bop");

  getWelcomeText()
    .then(res => {
      console.log(res)
      setWelcomeText(res)
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {welcomeText}
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
