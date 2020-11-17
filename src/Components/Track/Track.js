import React from 'react';
import ReactDOM from 'react-dom';
import './Track.css';
import './fonts.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.state = {progression:0, percentPayed :0, volume:0}

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.play = this.play.bind(this);
    this.playProgression = this.playProgression.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
  }
  addTrack() {
    this.props.onAdd(this.props.track)
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  fadeOut(audio, volume) {
    if (volume > 0)
        volume -= 0.1;
    else {
      volume = 0;
      clearInterval(this.fadeOutTimer);
    }
    console.log(volume)
    this.setState({volume: volume})
    audio.volume = this.state.volume;
  }
  fadeIn(audio, volume) {
    if (volume < 0.9)
        volume+=0.1;
    else {
      volume = 1;
      clearInterval(this.fadeInTimer);
    }
    this.setState({volume: volume})
    audio.volume = this.state.volume;
  }
  play(e) {
    const currentNode = e.target,
          parentNode = currentNode.parentElement,
          audio = parentNode.childNodes[0];

    if (this.props.playing) {
        this.setState({volume: 1});
        console.log(this.state.volume)
        this.fadeOut(this.props.currentTrack, this.state.volume)
    }
        

    audio.load();
    audio.addEventListener('canplaythrough', () => { 
      audio.volume = this.state.volume;
      audio.play();
      this.props.updateAudio(this.props.image, audio, true)

      this.fadeInTimer = setInterval(()=> {
        this.fadeIn(audio, this.state.volume);
      }, 400);
    }, false);

    this.timer = setInterval(this.playProgression, 1000);

    audio.onended = () => {
      let parent = audio.parentElement,
          progressionLines = parent.childNodes[1],
          progressionDiv = parent.childNodes[2];

      progressionDiv.classList.add('off');
      progressionLines.classList.add('off');

      setTimeout(() => {
        this.props.updateAudio("", false)
        this.setState({currentAudio:"", percentPayed: 0, progression : 0, volume: 0, playing: false})
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
        <div className="Progression-edges" style={{width: `${this.state.percentPayed}%`, opacity: `${this.state.percentPayed > 0 ? 1 : 0}` }}></div>
        <div className="Track-progression" style={{width: `${this.state.percentPayed}%` }}></div>
        <div className="Nr">
          {this.props.nr}
        </div>
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        <button className="Track-play" onClick={this.play}>
        </button>
        <button className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>{this.props.isRemoval ? "-" : "+"}</button>
    </div>
    );
  }
}
export default Track