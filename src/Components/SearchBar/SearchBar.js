// Standard package imports
import React from 'react';
import { useDispatch } from 'react-redux';

// custom package imports
import { setSearchTerm, setSearch } from '../../Features/Feed/feedSlice.js';

// Import Styling
import './searchbar.css';

// Component
const SearchBar = () => {

  const dispatch = useDispatch();

  // Set the search term when the user click the search button
  const handleSubmit = (event) => {
    event.preventDefault();
    let term = event.target[0].value;
    if(term !== '') {
      dispatch(setSearch(true));
      dispatch(setSearchTerm(term));
    }
  };

  return(
      <form
      name="searchForm"
      className="searchContainer"
      onSubmit={handleSubmit}>
          <input
          id="searchterm"
          type="search"
          name="searchterm"
          className="searchTerm" />
          <button
          type="submit"
          className="searchButton button-link">Search</button>
      </form>
  )
};

// Export the component
export default SearchBar;
