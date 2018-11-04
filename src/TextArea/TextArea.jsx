import React, { Component } from "react";

export default class TextArea extends Component {
  //generate input change handler prop to Container Component
  onChange = e => this.props.onChange(e);
  render() {
    return (
      <textarea
        onChange={this.onChange}
        cols={this.props.columns || "20"}
        rows={this.props.rows || "5"}
        placeholder={this.props.placeholder}
        value={this.props.value}
        className={this.props.class || "text-area"}
      />
    );
  }
}
