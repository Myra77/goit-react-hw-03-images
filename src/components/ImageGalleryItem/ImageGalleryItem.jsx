import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from '../Modal/Modal';

import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
    state = {
        showModal: false,
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({ showModal: !showModal }));
    };
    render() {
        const { tags, webformatURL, largeImageURL } = this.props;

        return (
            <li className={css.ImageGalleryItem}>
                <img
                    className={css.ImageGalleryItemImage}
                    src={webformatURL}
                    alt={tags}
                    onClick={this.toggleModal}
            />
            {this.state.showModal && (
                <Modal onCloseModal={this.toggleModal}>
                    <img src={largeImageURL} alt={tags} />
                </Modal>
            )}
            </li>
        );
    }
};

ImageGalleryItem.propTypes = {
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};