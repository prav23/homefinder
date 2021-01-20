import React, { Component } from 'react';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      //To route to different pages
      <BrowserRouter>
        <div>
          {/* This has Child Component named as Main*/}
          <Main />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
