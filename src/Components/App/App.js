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
  render (){
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* Add a SearchBar component */}
        <SearchBar />
        <div className="App-playlist">
          {/* Add a SearchResults component */}
          <SearchResults />
          {/* Add a Playlist component */}
          <Playlist />
        </div>
      </div>
      </div>
    )
  }
}


// export default App;
