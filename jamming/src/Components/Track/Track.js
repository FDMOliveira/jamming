import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props)
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack() {
    this.props.onAdd(this.props.track)
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  renderAction() {
    <button className="Track-action">{isRemoval ? "-" : "+"}</button>
  }
  render() {
    <div className="Track">
        <div className="Track-information">
            <h3>/* track name will go here */</h3>
            <p>/* track artist will go here*/ | /* track album will go here */</p>
        </div>
        <button className="Track-action" onClick={isRemoval ? this.addTrack : this.removeTrack}>{isRemoval ? "-" : "+"}</button>
    </div>
  }
}