import React, { Component } from 'react';
import Home from './Components/Home';
import SidebarMain from './Components/SidebarMain';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(err => err);
  }

  componentWillMount() {
      this.callAPI();
  }

  render() {
    return (
      <div className="App" id="outer-container">
        <SidebarMain pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id="page-wrap">
          <Home />
        </div>
      </div>
    )
  };
}

export default App;
