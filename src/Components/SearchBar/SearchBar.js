// Standard package imports
import React from 'react';
import { useDispatch } from 'react-redux';

// custom package imports
import { setSearchTerm } from '../../Features/Feed/feedSlice.js';

// Import Styling
import './searchbar.css';

// Component
const SearchBar = () => {

  const dispatch = useDispatch();

  // Set the search term when the user click the search button
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setSearchTerm(event.target[0].value));
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
          className="searchButton">Search</button>
      </form>
  )
};

// Export the component
export default SearchBar;
