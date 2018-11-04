import React, { Component } from "react";

export default class SearchComponent extends Component {
  // onSearch handler prop to Container Component
  onSearch = e => this.props.onSearch(e);

  render() {
    return (
      <div>
        <input
          placeholder={this.props.placeholder}
          onChange={this.onSearch}
          className={this.props.class || "search-field"}
        />
      </div>
    );
  }
}
