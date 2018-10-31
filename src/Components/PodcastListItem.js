import React from 'react';
import PropTypes from 'prop-types';

import './PodcastListItem.scss';

const PodcastListItem = ({ podcast, onClick }) => (
    <div key={podcast.id} className="list-item-container shadowed-box" onClick={onClick}>
        <div className="image-container"><img src={podcast.imageUrl} alt={podcast.title} /></div>
        <div className="title bold">{podcast.title}</div>
        <div className="author">Author: {podcast.author}</div>
    </div>
);


PodcastListItem.propTypes = {
    podcast: PropTypes.shape({
        id: PropTypes.string,
        imageUrl: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
    }),
};

export default PodcastListItem;
