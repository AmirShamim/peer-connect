import React from 'react';

function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  handleSearchSubmit, 
  isLoading, 
  appliedSearchTerm 
}) {
  return (
    <form onSubmit={handleSearchSubmit} className="w-full">
      <label htmlFor="search-students" className="block text-sm font-medium text-gray-700 mb-2">
        Search students
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="search-students"
          type="text"
          placeholder="Search by name, skill, department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow input-minimal"
          aria-label="Search for students"
          autoComplete="off"
        />
        <button
          type="submit"
          className="button-minimal bg-[#3B526F] hover:bg-[#1E2A3A] text-white"
          disabled={isLoading && appliedSearchTerm !== searchTerm}
          aria-label="Submit search"
          aria-busy={isLoading && searchTerm === appliedSearchTerm ? "true" : "false"}
        >
          {isLoading && searchTerm === appliedSearchTerm ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;