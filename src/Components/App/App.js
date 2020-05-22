import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResult.js';
import Playlist from '../Playlist/Playlist.js';


class App extends React.Component { 
  constructor(props){
    super(props)
    this.state ={
      SearchResults: [{
        name: "Wheels",
        artist: "Foo Fighters",
        album: "Greatest Hits",
        id: "1"
    },
    {
        name: "Pretender",
        artist: "Foo Fighters",
        album: "Greatest Hits",
        id: "2"
    },
    {
        name: "All My Life",
        artist: "Foo Fighters",
        album: "Greatest Hits",
        id: "3"
    }],

      playlistName: "Foo Fighters Playlist",
      playlistTracks: [
        {
            name: "Wheels",
            artist: "Foo Fighters",
            album: "Greatest Hits",
            id: "1"
        },
        {
            name: "Pretender",
            artist: "Foo Fighters",
            album: "Greatest Hits",
            id: "2"
        },
        {
            name: "All My Life",
            artist: "Foo Fighters",
            album: "Greatest Hits",
            id: "3"
        }]
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.SearchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  } 
}

export default App;

