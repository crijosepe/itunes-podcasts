import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './PodcastDetailHeader.scss';

const PodcastDetailHeader = ({ podcast }) => (
    <div key={podcast.id} className="podcast-detail-container shadowed-box">
        <Link to={`/podcast/${podcast.id}`}>
            <div className="image-container podcast-detail-box"><img src={podcast.imageUrl} alt={podcast.title} /></div>
            <div className="title-container podcast-detail-box">
                <div className="bold">{podcast.title}</div>
                <div className="italic">by {podcast.author}</div>
            </div>
        </Link>
        <div className="description-container">
            <div className="bold">Description:</div>
            <div className="italic" dangerouslySetInnerHTML={{ __html: podcast.description }} />
        </div>
    </div>
);


PodcastDetailHeader.propTypes = {
    podcast: PropTypes.shape({
        id: PropTypes.string,
        imageUrl: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        author: PropTypes.string,
    }),
};

export default PodcastDetailHeader;
