import React from 'react';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist'
import { Spotify } from '../../util/Spotify';

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  addTrack(newTrack) {
    if (this.state.playlistTracks.find(track => track.id === newTrack.id)) {
      alert('Track Exists')
    } else {
      this.setState({ playlistTracks: [...this.state.playlistTracks, newTrack] })
    }
  }

  removeTrack(existingTrack) {
    let filtered = this.state.playlistTracks.filter(track => track.id !== existingTrack.id)
    this.setState({ playlistTracks: filtered })
  }


  updatePlaylistName(name) {
    this.setState({ playlistName : name })
  }

  savePlaylist(){
    //not done
    // const trackURIs = this.state.playlistTracks.map( track => {
    //   return track.uri;
    // })
    Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks)
  }

  async search(term){
    const results = await Spotify.search(term);
    this.setState({searchResults : results})
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* Add a SearchBar component */}
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            {/* Add a SearchResults component */}
            <SearchResults 
              tracks={this.state.searchResults} 
              onAdd={this.addTrack} 
            />
            {/* Add a Playlist component */}
            <Playlist 
              name={this.state.playlistName} 
              tracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist} 
            />
          </div>
        </div>
      </div>
    )
  }
}


// export default App;
