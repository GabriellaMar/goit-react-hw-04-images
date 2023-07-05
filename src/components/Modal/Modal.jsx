// import { Component } from "react";
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './Modal.module.css'


export const Modal =({isOpen, imageURL, onCloseModal})=>{

useEffect(()=>{
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  }
  window.addEventListener('keydown', handleKeyDown);
  return ()=>{
  window.removeEventListener('keydown', handleKeyDown);
  }

}, [onCloseModal])

const handleBackdropClick = e => {
       if (e.target === e.currentTarget) {
        onCloseModal();
      }
     }

  return  isOpen && (
             <div className={styles.overlay} onClick={handleBackdropClick}>
    
              <div className={styles.modal}>
                <img src={imageURL} alt="" />
    
              </div>
              <button className={styles.closeButton} onClick={onCloseModal}>
                {/* &times; */}
                X
               </button>
            </div>
             )
  }


  Modal.propTypes ={
    isOpen: PropTypes.bool.isRequired,
    imageURL: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
}