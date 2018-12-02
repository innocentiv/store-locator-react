import React, { Component } from 'react';
import './App.css';

import SearchOpener from './components/search-opener';
import LeftPanel from './components/left-panel';
import StoresMap from './components/stores-map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchOpener />
        <LeftPanel />
        <StoresMap />
      </div>
    );
  }
}

export default App;
