// import { Component } from "react";
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
  window.removeEventListener('keydown', this.handleKeyDown);
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

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onCloseModal();
//     }
//   }

//   handleBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onCloseModal();
//     }
//   }
//   render() {
//     const { isOpen, imageURL } = this.props;
//     return (
//       isOpen && (
//         <div className={styles.overlay} onClick={this.handleBackdropClick}>

//           <div className={styles.modal}>
//             <img src={imageURL} alt="" />

//           </div>
//           <button className={styles.closeButton} onClick={this.props.onCloseModal}>
//             {/* &times; */}
//             X
//           </button>
//         </div>
//       )

//     )
//   }
// }