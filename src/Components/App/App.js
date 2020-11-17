import React from 'react';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import CurrentTrack from '../CurrentTrack/CurrentTrack'
import './App.css';

const Spotify = require("../../util/Spotify");

Spotify.getAccessToken();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [], playlistName: "Playlist", playlistTracks:[], currentTrack: "", currentTrackImg: "", playing : false }
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updateAudio = this.updateAudio.bind(this);
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
  updateAudio(track, image, play) {
    this.setState({currentTrack: track, currentTrackImg: image, playing: play});
  }
  render() {
    return ( 
      <div>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <CurrentTrack albumImage={this.state.currentTrackImg}/>
            <SearchResults currentTrack={this.state.currentTrack} playing={this.state.playing} updateAudio={this.updateAudio} searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            {/* <Playlist onAdd={this.addTrack} searchResults={this.state.searchResults} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} /> */}
          </div>
        </div> 
      </div>      
    );
  }
}

export default App;
