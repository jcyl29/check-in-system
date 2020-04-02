import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PageControls = ({
  totalPages,
  currentPage = 1,
  onPrevPage,
  onNextPage,
}) => {
  const show = totalPages > 1;
  const [page, setPage] = useState(currentPage);

  const handlePrevious = page => {
    setPage(page);
    onPrevPage(page);
  };

  const handleNext = page => {
    setPage(page);
    onNextPage(page);
  };

  const handleInputOnChange = p => {
    if ([isNaN(p), p < 0, p > totalPages].some(condition => condition)) {
      return;
    }

    if (p > page) {
      onNextPage(p);
    } else {
      onPrevPage(p);
    }
    setPage(p);
  };

  const renderButtons = () => (
    <>
      <button disabled={page === 1} onClick={() => handlePrevious(1)}>
        <i className="fas fa-fast-backward" />
      </button>
      <button disabled={page === 1} onClick={() => handlePrevious(page - 1)}>
        <i className="fas fa-backward" />
      </button>

      <input
        type="number"
        value={page}
        min={1}
        size={3}
        max={totalPages}
        onChange={({ target: { value } }) => {
          handleInputOnChange(parseInt(value, 10));
        }}
      />

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
  currentPage: 1,
  onPrevPage: () => {},
  onNextPage: () => {},
};

export default PageControls;
