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
                return <Track nr={i} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} track={track} key={track.id} image={track.image} name={track.name} artist={track.artist} album={track.album} uri={track.uri} changeImage={this.props.changeImage} onAdd={this.props.onAdd} />
            })
          }
        </div>
        <div className="TrackParent">
          { 
            this.props.tracks.map((track,i) => {
              if (i > this.props.avVal)
                return <Track nr={i} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} track={track} key={track.id} image={track.image} name={track.name} artist={track.artist} album={track.album} uri={track.uri} changeImage={this.props.changeImage} onAdd={this.props.onAdd} />
            })
          }
        </div>
      </div>
    );
  }
}
export default Tracklist