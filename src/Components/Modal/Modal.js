// Standard library imports
import React from 'react';

// Main component
const Modal = (props) => {

  // Handle the close button
  const handleModalClick = (ModalId) => {

  };

  // Setup the modal class type
  let modalTitle;
  let modalMessage;
  let modalFooter;
  if(props.modalType === 'error'){

    modalTitle = <div className="ModalTitle Modal-error">
      <h2>{props.title}</h2>
      <button className="ModalClose" onClick="handleModalClick">X</button>
    </div>;

    modalMessage = <div className="ModalMessage">
      <p>{props.message}</p>
    </div>;

    modalFooter = <div className="ModalFooter Modal-error">
      <p>{props.footer}</p>
    </div>;

  } else if(props.modalType === 'warn'){

    modalTitle = <div className="ModalTitle Modal-warn">
      <h2>{props.title}</h2>
    </div>;

    modalMessage = <div className="ModalMessage">
      <p>{props.message}</p>
    </div>;

    modalFooter = <div className="ModalFooter Modal-warn">
      <p>{props.footer}</p>
    </div>;

  } else {

    modalTitle = <div className="ModalTitle Modal-info">
      <h2>{props.title}</h2>
    </div>;

    modalMessage = <div className="ModalMessage">
      <p>{props.message}</p>
    </div>;

    modalFooter = <div className="ModalFooter Modal-info">
      <p>{props.footer}</p>
    </div>;

  }

  return(
    <div id={props.id} className="Modal Modal-block">
      <div className="ModalContainer">
        {modalTitle}
        {modalMessage}
        {modalFooter}
      </div>
    </div>
  )
};

export default Modal;
