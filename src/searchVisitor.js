import React, { useEffect, useState } from "react";
import "./App.scss";
import "./dialog-polyfill.css";
import useDebounce from "./useDebounce";

const SearchVisitor = () => {
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
      console.log("in UseEffect string exists", debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        onChange={evt => handleOnChange(evt.target.value)}
        placeholder="Search"
      />
      <pre>
        debouncedSearch: {JSON.stringify(debouncedSearch, 2, undefined)}
      </pre>
      <pre>searchTerm: {JSON.stringify(searchTerm, 2, undefined)}</pre>
    </form>
  );
};

export default SearchVisitor;
