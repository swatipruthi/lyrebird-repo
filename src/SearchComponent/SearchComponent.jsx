import React, { Component } from "react";
import CloseIcon from "../close-icon.png";

export default class SearchComponent extends Component {
  state = {
    searchInput: ""
  };
  // onSearch handler prop to Container Component
  onSearch = e => {
    this.setState({ searchInput: e.target.value });
    this.props.onSearch(e);
  };
  handleClose = e => {
    this.setState({ searchInput: "" });
    this.props.onSearch(e);
  };
  render() {
    return (
      <div>
        <input
          placeholder={this.props.placeholder}
          onChange={this.onSearch}
          value={this.state.searchInput}
          className={this.props.class || "search-field"}
        />
        {this.state.searchInput.length ? (
          <span
            className={this.props.showCross || "show-cross"}
            onClick={this.handleClose}
          >
            <img
              src={CloseIcon}
              alt=""
              className={this.props.closeIcon || "close-icon"}
            />
          </span>
        ) : null}
      </div>
    );
  }
}
