import React, { Component } from "react";
import fetch from "cross-fetch";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  componentDidMount() {
    fetch("https://avatar.lyrebird.ai/api/v0/generated", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer oauth_1CObEa9iKp4lcqwAjrFMxMO98i0"
      }
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
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
}

export default App;
