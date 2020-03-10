import React, { useEffect, useRef } from "react";
import dialogPolyfill from "dialog-polyfill";

const NewVisitorDialog = ({ show, setShowDialog }) => {
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

    if (inputs.every(node => !!node.value.trim())) {
      console.log("user filled in everything");
    } else {
      console.log("user left some fields blank");
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
      <h1>check out my dialog</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="First name" />
        <input placeholder="Last name" />
        <input placeholder="notes" />
        <button type="submit">Save</button>
      </form>
    </dialog>
  );
};

export default NewVisitorDialog;
