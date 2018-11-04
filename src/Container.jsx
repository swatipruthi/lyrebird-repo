import React, { Component } from "react";
import fetch from "cross-fetch";

import "./App.css";
import SearchComponent from "./SearchComponent";
import Recordings from "./Recordings";
import TextArea from "./TextArea";

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
      filteredArray: [],
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
        Authorization: `Bearer ${this.props.access_token}`
      },
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ results: res.results, filteredArray: res.results });
      });
  };

  // fetch generate utterances API
  generateApi = () => {
    fetch("https://avatar.lyrebird.ai/api/v0/generate", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.access_token}`
      },
      method: "POST",
      body: JSON.stringify({ text: this.state.text })
    })
      .then(res => res)
      .then(res => {
        this.generatedAPI();
        this.setState({ text: "" });
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
    this.setState({ filteredArray: filteredResult });
  };

  render() {
    return (
      <div className="container">
        <TextArea
          value={this.state.text}
          onChange={this.onChange}
          placeholder="Enter utterance..."
        />
        <div className="button-container">
          <button onClick={this.generateApi} className="generate-button">
            Generate
          </button>
        </div>
        <SearchComponent
          onSearch={this.onSearch}
          placeholder="Search for audios here..."
        />
        {this.state.results.length && (
          <Recordings filteredArray={this.state.filteredArray} />
        )}
      </div>
    );
  }
}
