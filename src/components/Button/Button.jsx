import PropTypes from 'prop-types';

import styles from './Button.module.css'
export const Button = ({ onClick, text }) => {
    return (
        <button className={styles.loadMoreButton} onClick={onClick}>

            {text}
        </button>
    )
}


Button.propTypes ={
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  }