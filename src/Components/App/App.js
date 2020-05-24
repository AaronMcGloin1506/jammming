import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResult.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';


class App extends React.Component { 
  constructor(props){
    super(props)
    this.addTrack=this.addTrack.bind(this)
    this.removeTrack=this.removeTrack.bind(this)
    this.updatePlaylistName=this.updatePlaylistName.bind(this)
    this.savePlaylist=this.savePlaylist.bind(this)
    this.search=this.search.bind(this)

    this.state ={
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: []
    }
  }

  // if the id of the track in the playlist matches the track id 
  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    else{
      //adding track to the array and setting the state to that array 
      tracks.push(track)
      this.setState({
        playlistTracks: tracks
      });
    }
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    const newPlaylist = tracks.filter(savedtrack => savedtrack.id != track.id);
    this.setState({
      playlistTracks: newPlaylist
    });
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    })
  }

  savePlaylist(){
    const trackURIs = this.state  .playlistTracks.map(playlistTrack=>playlistTrack.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(()=>{ 
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term){
    console.log(term);
    Spotify.search(term).then(searchResults =>{
      this.setState({searchResults: searchResults}); 
    })
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                            onAdd={this.addTrack}
                            />
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}
                      />
          </div>
        </div>
      </div>
    );
  } 
}

export default App;

