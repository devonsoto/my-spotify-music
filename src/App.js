import React, { Component } from 'react';
import Spotify from './Spotify/Spotify';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Spotify/>
      </div>
    );
  }
}

export default App;
