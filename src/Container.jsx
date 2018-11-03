import React, { Component } from "react";
import fetch from "cross-fetch";
import "./App.css";
import RecordIcon from "./icons8-microphone-26.png";
import StopIcon from "./circled-pause.png";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalContext: {},
      streamData: [],
      text: ""
    };
  }
  componentDidMount() {
    //GET api call to fetch the list of recorded audios
    fetch("https://avatar.lyrebird.ai/api/v0/generated", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer oauth_1CObEa9iKp4lcqwAjrFMxMO98i0"
      }
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }
  onChange = e => {
    //controlled input text field
    this.setState({ text: e.target.value });
  };
  startRecording = () => {
    let audio = document.getElementById("start");
    //get default media microphone
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        console.log(stream);
        //set MediaStream object
        audio.src = stream;
        //javascript MediaStream API
        var context = new AudioContext();
        let streamData = [];
        var source = context.createMediaStreamSource(audio.src);
        // process the audio and create chunks each of 1024 bytes
        var processor = context.createScriptProcessor(1024, 1, 1);
        source.connect(processor);
        processor.connect(context.destination);
        processor.onaudioprocess = function(e) {
          //push stream data to an array
          console.log(e.inputBuffer);
          streamData.push(e.inputBuffer);
        };
        //set the context to stop the stream buffering
        this.setState({ globalContext: context, streamData });
      })
      .catch(error => console.log(error));
  };

  stopRecording = () => {
    //close audio context connection
    this.state.globalContext.close();
    console.log("stopped recording", this.state.streamData);
    let blob = new Blob(this.state.streamData, { type: "audio/mp3" });
    console.log("blob", blob);
    this.generateApi(blob);
  };

  generateApi = blob => {
    //invoke POST generate api
    fetch("https://avatar.lyrebird.ai/api/v0/generate", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer oauth_1CObEa9iKp4lcqwAjrFMxMO98i0"
      },
      method: "POST",
      body: JSON.stringify({ text: this.state.text })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

  render() {
    return (
      <div className="text-field">
        <input
          type="text"
          value={this.state.text}
          onChange={this.onChange}
          placeholder="What's up?"
        />
        <div className="container">
          <button
            id="start"
            className="startButton"
            onClick={this.startRecording}
          >
            <img src={RecordIcon} alt="" />
          </button>
          <button id="stop" className="stopButton" onClick={this.stopRecording}>
            <img src={StopIcon} alt="" />
          </button>
        </div>
      </div>
    );
  }
}

export default Container;
