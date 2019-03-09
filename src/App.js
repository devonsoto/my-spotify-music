import React, { Component } from "react";
import Spotify from "./Components/Spotify/Spotify";

import "./App.less";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Spotify />
      </div>
    );
  }
}

export default App;
