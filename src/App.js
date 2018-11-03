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
  stopRecording = () => {
    fetch("https://avatar.lyrebird.ai/api/v0/generate", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer oauth_1CObEa9iKp4lcqwAjrFMxMO98i0"
      },
      method: "POST",
      body: JSON.stringify({ text: "hello" })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };
  startRecording = () => {
    let audio = document.getElementById("start");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        console.log(stream);
        audio.src = stream;
        var context = new AudioContext();
        var source = context.createMediaStreamSource(audio.src);
        var processor = context.createScriptProcessor(1024, 1, 1);
        source.connect(processor);
        processor.connect(context.destination);

        processor.onaudioprocess = function(e) {
          console.log(e.inputBuffer);
          context.close();
          // Do something with the data, i.e Convert this to WAV
        };
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div />
        </header>
        <button id="start" onClick={this.startRecording}>
          start{" "}
        </button>
        <button id="stop" onClick={this.stopRecording}>
          Stop
        </button>
      </div>
    );
  }
}

export default App;
