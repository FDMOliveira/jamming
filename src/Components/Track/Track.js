import React from 'react';
import ReactDOM from 'react-dom';
import './Track.css';
import './fonts.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {progression:0}
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.playPreview = this.playPreview.bind(this);
  }
  addTrack() {
    this.props.onAdd(this.props.track)
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  playPreview() {
    const currentNode = ReactDOM.findDOMNode(this),
          allAudios = document.querySelectorAll("audio"),
          currAudio = currentNode.querySelector("audio");
    currAudio.play();
  }
  render() {
    return(
      <div className="Track" onClick={this.playPreview}>
        <div className="Track-Progression">
        </div>
        <div className="Nr">
          {this.props.nr}
        </div>
        <div className="Track-information">
            <h3>{this.props.name}</h3>
            <p>{this.props.artist} | {this.props.album}</p>
            <audio controls> 
              <source src={this.props.preview} type="audio/mp3"></source>
          </audio>
        </div>
        <button className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>{this.props.isRemoval ? "-" : "+"}</button>
    </div>
    );
  }
}
export default Track