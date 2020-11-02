import React from 'react';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import './App.css';
const Spotify = require("../../util/Spotify");

Spotify.getAccessToken();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [], playlistName: "Playlist", playlistTracks:[] }
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this)
  } 
 
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    }) 
  } 
  addTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    if (!playlistTracks.includes(track)) {
      playlistTracks.push(track);
      this.setState({playlistTracks: playlistTracks})
    }
  } 
  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks.filter((song) => {
      if (track.id!==song.id) 
        return song 
    });
    this.setState({playlistTracks: newPlaylist})
  }
  updatePlaylistName(name) { 
    this.setState({playlistName: name})
  }
  savePlaylist() {
    let uris = this.state.playlistTracks.map(track => {return track.uri})
    Spotify.savePlaylist("Dynamic Playlist", uris)
    this.setState({playlistName: "Playlist", playlistTracks: [] })
  }
  render() {
    return ( 
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist onAdd={this.addTrack} searchResults={this.state.searchResults} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>      
    );
  }
}

export default App;
