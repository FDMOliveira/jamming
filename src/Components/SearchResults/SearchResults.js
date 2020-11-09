import React from 'react';
import TrackList from '../TrackList/TrackList'
import './SearchResults.css';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
          <TrackList onAdd={this.props.onAdd} tracks={this.props.searchResults} avVal={Object.keys(this.props.searchResults).length / 2} isRemoval={false} changeImage={this.props.changeImage} />
      </div>
    );
  }
}
export default SearchResults