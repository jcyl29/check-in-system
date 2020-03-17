import React, { useEffect, useRef } from "react";
import dialogPolyfill from "dialog-polyfill";
import PropTypes from "prop-types";

const NewVisitorDialog = ({ show, setShowDialog, addNewVisitor }) => {
  const dialog = useRef(null);

  useEffect(() => {
    dialogPolyfill.registerDialog(dialog.current);
    dialog.current.addEventListener("close", () => {
      // need to update the parent container state representation of this dialog.
      // otherwise this will cause a bug where clicking the same movie after closing
      // dialog won't open the dialog
      setShowDialog(false);
    });
  }, [setShowDialog]);

  const closeModal = () => {
    dialog.current.close();
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const inputs = Array.prototype.filter.call(
      evt.target.elements,
      node => node.tagName.toLowerCase() === "input"
    );

    const name = inputs
      .reduce((acc, node) => {
        if (node.placeholder.includes("name")) {
          return acc.push(node.value) && acc;
        } else {
          return acc;
        }
      }, [])
      .join(" ");

    const notes = inputs.reduce((acc, node) => {
      if (node.placeholder === "notes") {
        return (acc += node.value);
      } else {
        return acc;
      }
    }, "");

    if (inputs.every(node => !!node.value.trim())) {
      addNewVisitor({ name, notes }).then(() => {
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
      />
      <h1>Please enter visitor details</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <input placeholder="First name" />
          <input placeholder="Last name" />
        </p>
        <p>
        <input placeholder="notes" />
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
