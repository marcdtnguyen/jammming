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

export class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchResults : [
        {name: 'name1', artist: "artist1", album: 'album1', id: 'id1'},
        {name: 'name2', artist: "artist2", album: 'album2', id: 'id2'},
        {name: 'name3', artist: "artist3", album: 'album3', id: 'id3'}
      ],
      playlistName : 'playlist1',
      playlistTracks : [
        {name: 'name4', artist: "artist4", album: 'album4', id: 'id4'},
        {name: 'name5', artist: "artist5", album: 'album5', id: 'id5'},
        {name: 'name6', artist: "artist6", album: 'album6', id: 'id6'}
      ]
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
  }

  addTrack(newTrack) {
    if(this.state.playlistTracks.find( track => track.id === newTrack.id)){
      alert('Track Exists')
    } else {
      this.setState({playlistTracks: [...this.state.playlistTracks, newTrack]})
    }
  }

  removeTrack(existingTrack){
    let filtered = this.state.playlistTracks.filter( track => track.id !== existingTrack.id)
    this.setState({playlistTracks : filtered})
  }

  render (){
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* Add a SearchBar component */}
        <SearchBar />
        <div className="App-playlist">
          {/* Add a SearchResults component */}
          <SearchResults tracks={this.state.searchResults} onAdd={this.addTrack}/>
          {/* Add a Playlist component */}
          <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
        </div>
      </div>
      </div>
    )
  }
}


// export default App;
