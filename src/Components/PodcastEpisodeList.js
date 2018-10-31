import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './PodcastEpisodeList.scss';

export class PodcastEpisodeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
        };
    }

    renderEpisodesTable() {
        const { id } = this.state;
        const { episodes } = this.props;

        if (!episodes) return 'No episodes available';

        return (
            <div className="episodes-table shadowed-box">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes.map(episode => (
                            <tr key={episode.id}>
                                <td>
                                    <Link to={`/podcast/${id}/episode/${episode.id}`}>{episode.title}</Link>
                                </td>
                                <td>{episode.pubDate}</td>
                                <td>{episode.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        const { episodes } = this.props;

        const episodesLenght = episodes ? episodes.length : 0;

        return (
            <div className="podcast-detail-right-column">
                <div className="podcast-episode-count shadowed-box bold">
                Episodes: {episodesLenght}
                </div>
                {this.renderEpisodesTable()}
            </div>
        );
    }
}

PodcastEpisodeList.propTypes = {
    episodes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        pubDate: PropTypes.string,
        duration: PropTypes.string,
    })),
};

export default PodcastEpisodeList;
