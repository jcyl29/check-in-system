import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PageControls = ({ totalPages, currentPage, onPrevPage, onNextPage }) => {
  const show = totalPages > 1;
  const [page, setPage] = useState(currentPage);

  const handlePrevious = page => {
    setPage(page);
    onPrevPage();
  };

  const handleNext = page => {
    setPage(page);
    onNextPage();
  };

  const renderButtons = () => (
    <>
      <button disabled={page === 1} onClick={() => handlePrevious(1)}>
        <i className="fas fa-fast-backward" />
      </button>
      <button disabled={page === 1} onClick={() => handlePrevious(page - 1)}>
        <i className="fas fa-backward" />
      </button>
      <form>
        <input
          type="number"
          value={page}
          min={1}
          max={totalPages}
          onChange={({ target: { value } }) => {
            setPage(parseInt(value, 10));
          }}
        />
      </form>
      <button
        disabled={page === totalPages}
        onClick={() => handleNext(page + 1)}
      >
        <i className="fas fa-step-forward" />
      </button>
      <button
        disabled={page === totalPages}
        onClick={() => handleNext(totalPages)}
      >
        <i className="fas fa-fast-forward" />
      </button>
    </>
  );

  return <footer>{show && renderButtons()}</footer>;
};

PageControls.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPrevPage: PropTypes.func,
  onNextPage: PropTypes.func,
};

PageControls.defaultProps = {
  onPrevPage: () => {},
  onNextPage: () => {},
};

export default PageControls;
