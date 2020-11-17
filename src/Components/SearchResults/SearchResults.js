import React from 'react';
import TrackList from '../TrackList/TrackList'
import './SearchResults.css';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
          <TrackList currentTrack={this.props.currentTrack} playing={this.props.playing} onAdd={this.props.onAdd} tracks={this.props.searchResults} avVal={Object.keys(this.props.searchResults).length / 2} isRemoval={false} updateAudio={this.props.updateAudio} />
      </div>
    );
  }
}
export default SearchResults