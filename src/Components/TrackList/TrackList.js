import React from 'react';
import Track from '../Track/Track'
import './TrackList.css';

class Tracklist extends React.Component {
  render() {
    return (
      <div className="TrackList">
        <div className="TrackParent">
          { 
            this.props.tracks.map((track,i) => {
              if (i < this.props.avVal)
                return <Track nr={i} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} track={track} key={track.id} preview={track.preview} img={track.img} name={track.name} artist={track.artist} album={track.album} uri={track.uri} onAdd={this.props.onAdd} />
            })
          }
        </div>
        <div className="TrackParent">
          { 
            this.props.tracks.map((track,i) => {
              if (i > this.props.avVal)
                return <Track nr={i} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} track={track} key={track.id} preview={track.preview} img={track.img} name={track.name} artist={track.artist} album={track.album} uri={track.uri} onAdd={this.props.onAdd} />
            })
          }
        </div>
      </div>
    );
  }
}
export default Tracklist