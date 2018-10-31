import React from 'react';
import PropTypes from 'prop-types';

import './PodcastEpisodeDetail.scss';

export class PodcastEpisodeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            episodeId: props.match.params.episodeId,
            episode: null,
        };
    }

    componentDidMount() {
        const { episodeId } = this.state;
        const { episodes } = this.props;
        const episode = episodes.find(ep => ep.id === parseInt(episodeId, 10));
        if (episode) {
            this.setState({ episode });
        }
    }

    render() {
        const { episode } = this.state;
        if (!episode) return 'No episode available';
        return (
            <div key={episode.id} className="episode-detail-container shadowed-box">
                <div className="title bold">{episode.title}</div>
                <div className="italic" dangerouslySetInnerHTML={{ __html: episode.description }} />
                <audio controls>
                    <source src={episode.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        );
    }
}


PodcastEpisodeDetail.propTypes = {
    episode: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
    }),
};

export default PodcastEpisodeDetail;
