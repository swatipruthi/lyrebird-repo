import React, { Component } from "react";
import fetch from "cross-fetch";

import "./App.css";
import SearchComponent from "./SearchComponent/SearchComponent";
import GeneratedAudios from "./GeneratedAudios/GeneratedAudios";

export default class Container extends Component {
  constructor(props) {
    super(props);
    //initialise state variables to avoid undefined values on render
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

  // fetch generated audios from API on initial render
  componentDidMount() {
    this.generatedAPI();
  }

  // generate utterances input change handler
  onChange = e => {
    this.setState({ text: e.target.value });
  };

  // fetch generated utterances API
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
        this.setState({ results: res.results, filteredText: res.results });
      });
  };

  // fetch generate utterances API
  generateApi = () => {
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
        this.generatedAPI();
      });
  };

  // search utterances from the list of generated audios
  onSearch = e => {
    let filteredResult = this.state.results;
    if (e.target.value) {
      filteredResult = this.state.results.filter(element => {
        return (
          element.text
            .trim()
            .toLowerCase()
            .indexOf(e.target.value.trim().toLowerCase()) !== -1
        );
      });
    }
    this.setState({ filteredText: filteredResult });
  };

  render() {
    return (
      <div className="text-field">
        <SearchComponent
          onChange={this.onChange}
          search={false}
          utterance={this.state.text}
        />
        <div className="container">
          <button onClick={this.generateApi} className="generate-button">
            Generate
          </button>
        </div>
        <SearchComponent onSearch={this.onSearch} search={true} />
        {this.state.results.length > 0 && (
          <GeneratedAudios filteredText={this.state.filteredText} />
        )}
      </div>
    );
  }
}
