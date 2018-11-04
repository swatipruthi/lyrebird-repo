import React, { Component } from "react";

export default class SearchComponent extends Component {
  // onSearch handler prop to Container Component
  onSearch = e => {
    this.props.onSearch(e);
  };
  //generate input change handler prop to Container Component
  onChange = e => {
    this.props.onChange(e);
  };

  render() {
    return (
      <div>
        {this.props.search ? (
          <input
            type="text"
            placeholder="Search for audios here..."
            onChange={this.onSearch}
          />
        ) : (
          <input
            type="text"
            value={this.props.utterance}
            onChange={this.onChange}
            placeholder="What's up?"
          />
        )}
      </div>
    );
  }
}
