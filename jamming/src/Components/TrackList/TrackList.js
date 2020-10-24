import React from 'react';
import Track from '../Track/Track'
import './Tracklist.css';

class Tracklist extends React.Component {
  render() {
    <div className="TrackList">
        {
          this.props.searchResults.map(track => {
            <Track isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} tracks={this.props.tracks} key={track.id} name={track.name} artist={track.artist} album={track.album} onAdd={this.props.onAdd}/>
          })
        }
    </div>
  }
}
export default Tracklist