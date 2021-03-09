import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className="modalContainer">
      <div className="modalContent">{props.children}</div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
