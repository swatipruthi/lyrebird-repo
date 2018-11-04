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
      <dl>
        {this.props.filteredArray.map((result, index) => {
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
  }
}
