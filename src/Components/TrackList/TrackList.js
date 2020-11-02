import React from 'react';
import Track from '../Track/Track'
import './TrackList.css';

class Tracklist extends React.Component {
  render() {
    return (
      <div className="TrackList">
        { 
          this.props.tracks.map(track => {
            return <Track isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} track={track} key={track.id} name={track.name} artist={track.artist} album={track.album} uri={track.uri} onAdd={this.props.onAdd} />
          })
        }
      </div>
    );
  }
}
export default Tracklist