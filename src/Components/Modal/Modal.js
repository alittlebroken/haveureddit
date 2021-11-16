// Standard library imports
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import the slice selectors and actions
import {
  selectShow,
  selectType,
  selectMessage,
  showModal,
 } from '../../Features/Modal/ModalSlice';

// Component styling
import './modal.css';

// Main component
const Modal = (props) => {

  const dispatch = useDispatch();

  // Assign data from selectors
  const showDialog = useSelector(selectShow);
  const modalContent = useSelector(selectMessage);
  const modalType = useSelector(selectType);

  // Setup the modal classes
  const modalClass = showDialog ? "Modal Modal-block" : "Modal Modal-none";
  const modalTitle = modalType === 'error' ? "ModalTitle ModalError" : "ModalTitle";

  // Handle close button
  const handleClose = () => {
    dispatch(showModal());
  };

  return(
    <div className={modalClass}>
      <div className="ModalContainer">
        <div className={modalTitle}>
          <span><h2>{modalContent.title}</h2></span>
          <button className="ModalClose" onClick={handleClose}>
            &#10005;
          </button>
        </div>
        <div className="ModalMessage"><pre>{modalContent.content}</pre></div>
      </div>
    </div>
  )
};

export default Modal;
