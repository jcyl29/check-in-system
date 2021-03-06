import React, { useEffect, useRef } from 'react';
import './visitorDialog.scss';
import dialogPolyfill from 'dialog-polyfill';
import PropTypes from 'prop-types';

const NewVisitorDialog = ({ show, setShowDialog, addNewVisitor }) => {
  const dialog = useRef(null);
  const form = useRef(null);

  useEffect(() => {
    dialogPolyfill.registerDialog(dialog.current);
    dialog.current.addEventListener('close', () => {
      // need to update the parent container state representation of this dialog.
      setShowDialog(false);
    });
  }, [setShowDialog]);

  // this check is needed in Firefox that is using the polyfill
  if (show && dialog.current && !dialog.current.hasAttribute('open')) {
    dialog.current.showModal();
  }

  const closeModal = () => {
    dialog.current.close();
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const inputs = Array.prototype.filter.call(
      evt.target.elements,
      node => node.tagName.toLowerCase() === 'input'
    );

    const name = inputs
      .reduce((acc, node) => {
        if (node.id.includes('name')) {
          return acc.push(node.value) && acc;
        } else {
          return acc;
        }
      }, [])
      .join(' ');

    const notes = inputs.reduce((acc, node) => {
      if (node.id === 'notes') {
        return (acc += node.value);
      } else {
        return acc;
      }
    }, '');

    if (inputs.every(node => !!node.value.trim())) {
      addNewVisitor({ name, notes }).then(() => {
        form.current.reset();
        closeModal();
      });
    }
  };

  return (
    <dialog ref={dialog} open={show}>
      <i
        role="button"
        aria-hidden="true"
        className="close-button fas fa-times-circle"
        onClick={closeModal}
        autoFocus
      />
      <h1>Please enter visitor details</h1>
      <form onSubmit={handleSubmit} ref={form}>
        <p>
          <input id="first-name" placeholder="First name" />
          <input id="last-name" placeholder="Last name" />
        </p>
        <p>
          <input id="notes" placeholder="Notes" />
        </p>
        <button type="submit">Save</button>
      </form>
    </dialog>
  );
};

NewVisitorDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  addNewVisitor: PropTypes.func.isRequired
};

export default NewVisitorDialog;
