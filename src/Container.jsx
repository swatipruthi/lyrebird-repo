import React, { Component } from "react";
import fetch from "cross-fetch";
import "./App.css";
import DownloadIcon from "./download-1915753_960_720.png";
import PlayButton from "./play-button.jpg";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalContext: {},
      streamData: [],
      text: "",
      results: [],
      audios: [],
      filteredText: [],
      searchText: ""
    };
  }
  componentDidMount() {
    //GET api call to fetch the list of recorded audios
    this.generatedAPI();
  }
  generatedAPI = () => {
    fetch("https://avatar.lyrebird.ai/api/v0/generated", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer oauth_1CVyubRIlAjvBzlCWGxP1WpPRCV"
      },
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({ results: res.results, filteredText: res.results });
      });
  };
  generateApi = () => {
    //invoke POST generate api
    fetch("https://avatar.lyrebird.ai/api/v0/generate", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer oauth_1CVyubRIlAjvBzlCWGxP1WpPRCV"
      },
      method: "POST",
      body: JSON.stringify({ text: this.state.text })
    })
      .then(res => res)
      .then(res => {
        console.log(res);
        this.generatedAPI();
      });
  };
  showAudio = index => {
    this.refs[index].play();
  };
  downloadAudio = async url => {
    const response = await fetch(url);
    const wav = await response.blob();
    const blobURL = URL.createObjectURL(wav);
    const link = document.createElement("a"); // Or maybe get it from the current document
    link.href = blobURL;
    link.download = `${+new Date()}.wav`;
    link.click();
  };
  renderGeneratedAudios = () => {
    return (
      <dl>
        {this.state.filteredText.map((result, index) => {
          return (
            <div key={result.created_at}>
              <div className="wrapper">
                <audio
                  controls
                  className="audio-controls"
                  src={result.url}
                  ref={`audio_${index}`}
                />
                <button
                  onClick={e => this.showAudio(`audio_${index}`)}
                  className="download-button"
                >
                  <img src={PlayButton} className="download" alt="" />
                </button>
                <div className="generated-text">{result.text}</div>
                <span className="download-link">
                  <button
                    className="download-button"
                    onClick={e => this.downloadAudio(result.url)}
                  >
                    <img src={DownloadIcon} className="download" alt="" />
                  </button>
                </span>
              </div>
              <br />
            </div>
          );
        })}
      </dl>
    );
  };
  handleInputChange = e => {
    this.setState({ searchText: e.target.value });
  };

  onSearch = e => {
    let filteredResult = this.state.results;
    if (e.target.value) {
      filteredResult = this.state.results.filter(element => {
        return (
          element.text.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1
        );
      });
    }
    this.setState({ filteredText: filteredResult });
  };

  render() {
    return (
      <div className="text-field">
        <input
          type="text"
          value={this.state.text}
          onChange={this.onChange}
          placeholder="What's up?"
          ref="test"
        />
        <div className="container">
          <button onClick={this.generateApi} className="generate-button">
            Generate
          </button>
        </div>
        <input
          type="text"
          placeholder="Search for audios here..."
          onChange={this.onSearch}
        />
        {this.state.results.length > 0 && this.renderGeneratedAudios()}
      </div>
    );
  }
}

export default Container;
