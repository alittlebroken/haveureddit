import React from 'react';
import Feed from '../Components/Feed/Feed';
import SearchBar from '../Components/SearchBar/SearchBar';
import SubReddits from '../Components/subReddits/subReddits';

function App() {
  return (
    <div>
      <SearchBar />
      <SubReddits />
      <Feed />
    </div>
  );
}

export default App;
