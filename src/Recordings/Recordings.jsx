import React, { PureComponent } from "react";
import GeneratedAudios from "../GeneratedAudios";
export default class Recordings extends PureComponent {
  render() {
    return (
      <div className={this.props.class || "recording-wrapper"}>
        {this.props.filteredArray.map((result, index) => {
          return (
            <GeneratedAudios
              result={result}
              index={index}
              key={result.created_at}
            />
          );
        })}
      </div>
    );
  }
}
