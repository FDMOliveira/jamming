import React from 'react';
import ReactDOM from 'react-dom';
import './Track.css';
import './fonts.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.state = {progression:0, percentPayed :0}
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.playMusic = this.playMusic.bind(this);
    this.playProgression = this.playProgression.bind(this);
  }
  addTrack() {
    this.props.onAdd(this.props.track)
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  playMusic(e) {
    const currentNode = e.target,
          parentNode = currentNode.parentElement,
          targetAudio = parentNode.childNodes[0];
    
    targetAudio.load();
    targetAudio.play();
    
    this.setState({currentAudio: targetAudio})
    this.timer = setInterval(this.playProgression, 1000);
    this.props.changeImage(this.props.image)

    targetAudio.onended = () => {
      let parent = targetAudio.parentElement,
          progressionLines = parent.childNodes[1],
          progressionDiv = parent.childNodes[2];

      progressionDiv.classList.add('off');
      progressionLines.classList.add('off');

      setTimeout(() => {
        this.setState({percentPayed: 0, progression : 0})
        clearInterval(this.timer);
      }, 400);
    };
  }
  playProgression() {
    let progression = this.state.progression+1,
        percentPayed = (progression*100) / 30;

    this.setState({percentPayed: percentPayed, progression : progression})
  }
  render() {
    return(
      <div className="Track">
        <audio> 
          <source src={this.props.track.preview} type="audio/mp3"></source>
        </audio>
        <div className="Progression-edges" style={{width: `${this.state.percentPayed}%`, opacity: `${this.state.percentPayed>0 ? 1 : 0}` }}></div>
        <div className="Track-progression" style={{width: `${this.state.percentPayed}%` }}></div>
        <div className="Nr">
          {this.props.nr}
        </div>
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        <button className="Track-play" onClick={this.playMusic}>
        </button>
        <button className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>{this.props.isRemoval ? "-" : "+"}</button>
    </div>
    );
  }
}
export default Track