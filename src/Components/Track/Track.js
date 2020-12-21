import React from 'react';
import './Track.css';
import './fonts.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.state = {progression:0, percentPayed :0, volume:0, playing:false}

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
    if (volume > 0.1)
        volume -= 0.1;
    else {
      volume = 0;
      clearInterval(this.fadeOutTimer);
      this.setState({percentPayed: 0, progression : 0, playing: false})
    }
    this.setState({volume: volume});
    audio.volume = this.state.volume;
  }
  fadeIn(audio, volume) {
    if (volume < 0.9)
        volume+=0.1;
    else {
      volume = 1;
      clearInterval(this.fadeInTimer);
      this.setState({playing: true})
    }
    this.setState({volume: volume});
    audio.volume = this.state.volume;
  }
  play(e) {
    let currentNode = e.target,
          parentNode = currentNode.parentElement,
          audio = parentNode.childNodes[0];
    
    if (this.props.playing) {
        let last = this.props.lastTrack;
        last.pause();
        last.currentTime = 0;
    }

    audio.load();
    console.log(audio)
    audio.oncanplaythrough = () => {
      this.setState({volume:0});
      audio.volume = this.state.volume;
      audio.play();
      console.log("fire")
      this.props.updateAudio(audio, this.props.image, true)
      this.fadeInTimer = setInterval(()=> {
        this.fadeIn(audio, this.state.volume);
      }, 400);
    };

    this.timer = setInterval(this.playProgression, 1000);

    audio.onended = () => {
      setTimeout(() => {
        this.props.updateAudio("", "",false)
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
        <div className={`Progression-edges ${this.state.percentPayed < 1 ? `off` : ``}`} style={{width: `${this.state.percentPayed}%`, opacity: `${this.state.percentPayed > 0 ? 1 : 0}` }}></div>
        <div className={`Track-progression ${this.state.percentPayed < 1 ? `off` : ``}`} style={{width: `${this.state.percentPayed}%` }}></div>
        <div className="Nr">
          {this.props.nr}
        </div>
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        <button className="Track-play" onClick={this.play} style={{opacity: `${this.props.playing ? '0.5' : 1}`, pointerEvents: `${this.props.playing ? 'none' : 'all'}`}}>
        </button>
        <button className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>{this.props.isRemoval ? "-" : "+"}</button>
    </div>
    );
  }
}
export default Track