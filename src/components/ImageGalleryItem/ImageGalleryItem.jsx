import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';


export const ImageGalleryItem = ({ image, onOpenModal }) => {
  const handleImageClick = () => {
    onOpenModal(image.largeImageURL);
  };

  return (
    <li  className={styles.ImageGalleryItem} onClick={handleImageClick}>
      <img className={styles.ImageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  )
}

ImageGalleryItem.propTypes ={
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  onOpenModal: PropTypes.func.isRequired,
}