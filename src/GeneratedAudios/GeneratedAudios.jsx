import React, { PureComponent } from "react";

import DownloadIcon from "../download-1915753_960_720.png";
import PlayButton from "../play-button.jpg";

export default class GeneratedAudios extends PureComponent {
  // convert the URL to Blob so that it is directly downloadable on same window
  downloadAudio = async url => {
    const response = await fetch(url);
    const wav = await response.blob();
    const blobURL = URL.createObjectURL(wav);
    // Or maybe get it from the current document
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = `${+new Date()}.wav`;
    link.click();
  };

  // function to play audio with customized css property of <audio />
  showAudio = index => {
    this.refs[index].play();
  };

  render() {
    return (
      <div key={this.props.result.created_at}>
        <div className={this.props.wrapperClass || "wrapper"}>
          <audio
            controls
            className={this.props.controlClass || "audio-controls"}
            src={this.props.result.url}
            ref={`audio_${this.props.index}`}
          />
          <button
            onClick={e => this.showAudio(`audio_${this.props.index}`)}
            className={this.props.buttonClass || "download-button"}
          >
            <img
              src={PlayButton}
              className={this.props.downloadClass || "download"}
              alt=""
            />
          </button>
          <div className={this.props.textClass || "generated-text"}>
            {this.props.result.text}
          </div>
          <span className={this.props.downloadLink || "download-link"}>
            <button
              className={this.props.buttonClass || "download-button"}
              onClick={e => this.downloadAudio(this.props.result.url)}
            >
              <img
                src={DownloadIcon}
                className={this.props.downloadClass || "download"}
                alt=""
              />
            </button>
          </span>
        </div>
        <br />
      </div>
    );
  }
}
