import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from '../ImageGallery/ImageGallery.module.css'

export default function ImageGallery({ images }) {
    return (
        <ul className={css.ImageGallery}>
            {images.map(image => (
                <ImageGalleryItem
                    key={image.id}
                    tags={image.tags}
                    webformatURL={image.webformatURL}
                    largeImageURL={image.largeImageURL}
                />
            ))}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
};