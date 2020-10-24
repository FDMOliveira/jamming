import React from 'react';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [{name:"a", artist: "b", album: "c", id: 1}, {name:"a", artist: "b", album: "c", id: 2}], playlistName: "Playlist", playlistTracks:[{name:"a", artist: "b", album: "c", id: 1}, {name:"a", artist: "b", album: "c", id: 2}] }
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }
  search(term) {
    this.setState({searchResults: Spotify.search(term)})
  } 
  addTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    if (!playlistTracks.includes(track)) {
      let newPlaylist = playlistTracks.push(track);
      this.setState({playlistTracks: newPlaylist})
    }
  }
  removeTrack(track) {
    this.state.playlistTracks.filter((song) => {
      if (track.id!==song.id) 
        return song 
    });
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }
  savePlaylist() {
    Spotify.savePlaylist()
    const trackURIs = []
  }
  render() {
    return ( 
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist searchResults={this.state.searchResults} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.state.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>      
    );
  }
}

export default App;
