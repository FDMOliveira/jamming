import React from 'react';
import TrackList from '../TrackList/TrackList'
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange= this.handleNameChange.bind(this);
  }
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }
  render() {
    <div class="Playlist">
        <input onChange={this.handleNameChange} defaultValue="{'New Playlist'}"/>
        <TrackList isRemoval={true} onRemove={this.props.onRemove}  tracks={this.props.tracks} />
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
    </div>
  }
}
export default Playlist