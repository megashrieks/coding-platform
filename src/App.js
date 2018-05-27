import React, { Component } from 'react';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <Main/>
      </div>
    );
  }
}

export default App;
