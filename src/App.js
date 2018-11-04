import React, { Component } from "react";
import "./App.css";
import Container from "./Container";

const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || "";
const API_KEY = process.env.REACT_APP_API_KEY || "";

class App extends Component {
  getAccessToken = () => {
    const hashString = window.location.hash || "";
    const access_token = hashString.substring(14, hashString.indexOf("&"));
    return access_token;
  };
  state = {
    isAuthorized: this.getAccessToken().length > 0
  };

  onMount = () => {
    this.setState({ isAuthorized: true });
  };

  render() {
    console.log("env", process.env);

    const url =
      "https://myvoice.lyrebird.ai/authorize?response_type=token&client_id=" +
      API_KEY +
      "&redirect_uri=" +
      REDIRECT_URI +
      "&scope=voice profile&state=" +
      new Date();

    return (
      <div>
        {!this.state.isAuthorized ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            Authorize
          </a>
        ) : (
          <div className="app">
            <header className="header-class">Lyrebird App</header>
            <Container
              onMount={this.onMount}
              access_token={this.getAccessToken()}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
