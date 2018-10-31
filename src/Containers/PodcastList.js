import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ACTIONS from '../actions';

import PodcastListItem from '../Components/PodcastListItem';

import './PodcastList.scss';

export class PodcastList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textToSearch: '',
        };
    }

    componentDidMount() {
        const { fetchPodcasts } = this.props;

        fetchPodcasts();
    }

    getPodcastsJSX() {
        const { textToSearch } = this.state;
        const { podcasts, history, initializePodcast } = this.props;

        const upperTextToSearch = textToSearch.toUpperCase();

        if (podcasts) {
            let podcastsJSX = [];
            // we avoid a double loop filter-map with a forEach
            podcasts.forEach((podcast) => {
                if (podcast.title.toUpperCase().includes(upperTextToSearch) || podcast.author.toUpperCase().includes(upperTextToSearch)) {
                    podcastsJSX.push(<PodcastListItem
                        key={podcast.id}
                        podcast={podcast}
                        onClick={() => {
                            initializePodcast(podcast);
                            history.push(`/podcast/${podcast.id}`);
                        }}
                    />);
                }
            });
            return podcastsJSX;
        }
        return [];
    }

    render() {
        const { textToSearch } = this.state;
        const podcastsJSX = this.getPodcastsJSX();

        return (
            <div>
                <div className="filters">
                    <span className="counter">{podcastsJSX.length}</span>
                    <input
                        name="search"
                        className="search"
                        type="text"
                        placeholder="Filter podcasts..."
                        value={textToSearch}
                        onChange={(e) => { this.setState({ textToSearch: e.target.value }); }}
                    />
                </div>
                <div className="podcasts-list">
                    {podcastsJSX}
                </div>
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        podcasts: state.podcastsReducer.podcasts,
    };
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(ACTIONS, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastList);
