import React from 'react';
import logo from './logo.svg';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {searchResults: [], playlistName: "Playlist", playlistTracks:[] }
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }
  search(term) {
    console.log(term)
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
      if (track.id!==song.id) return 
    });
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }
  savePlaylist() {
    const trackURIs = []
  }
  render() {
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack()}/>
          <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.state.removeTrack} name={this.state.playlistName} tracks={this.state.playlistTracks} />
        </div>
      </div>
    </div>
  }
}

export default App;
