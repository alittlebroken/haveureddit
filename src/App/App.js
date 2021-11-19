import React from 'react';
import Feed from '../Components/Feed/Feed';
import SearchBar from '../Components/SearchBar/SearchBar';
import SubReddits from '../Components/subReddits/subReddits';

import './app.css';

function App() {
  return (
    <div className="appContainer">
      <SearchBar />
      <SubReddits />
      <Feed />
    </div>
  );
}

export default App;
