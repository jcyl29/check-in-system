import React, { useEffect, useState } from "react";
import "./App.scss";
import "./dialog-polyfill.css";
import useDebounce from "./useDebounce";
import PropTypes from "prop-types";

const SearchVisitor = ({ queryVisitors }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleOnChange = value => {
    const newSearchValue = value.trim();
    setSearchTerm(newSearchValue);
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
  };

  useEffect(() => {
    if (debouncedSearch) {
      queryVisitors({ name: debouncedSearch });
    } else {
      queryVisitors();
    }
  }, [debouncedSearch]);

  return (
    <form className="visitor-search" onSubmit={handleOnSubmit}>
      <input
        onChange={evt => handleOnChange(evt.target.value)}
        placeholder="Search full name"
      />
    </form>
  );
};

SearchVisitor.propTypes = {
  queryVisitors: PropTypes.func.isRequired
};

export default SearchVisitor;
