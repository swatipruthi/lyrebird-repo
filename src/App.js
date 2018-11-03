import React, { Component } from "react";
import "./App.css";
import Container from "./Container";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header-class">Lyrebird App</header>
        <Container />
      </div>
    );
  }
}

export default App;
