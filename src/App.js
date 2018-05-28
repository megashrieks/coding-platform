import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Sidebar />
          <Main/>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
