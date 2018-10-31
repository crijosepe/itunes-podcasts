import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router';
import ACTIONS from '../actions';

import PodcastDetailHeader from '../Components/PodcastDetailHeader';
import PodcastEpisodeList from '../Components/PodcastEpisodeList';
import PodcastEpisodeDetail from '../Components/PodcastEpisodeDetail';

import './PodcastDetail.scss';

export class PodcastDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
        };
    }

    componentDidMount() {
        const { id } = this.state;
        const { fetchPodcastById } = this.props;

        fetchPodcastById(id);
    }

    render() {
        const { podcast, episodes } = this.props;
        if (!podcast) return 'No podcast available';
        return (
            <div className="podcast-detail">
                <PodcastDetailHeader podcast={podcast} />
                <Route exact path="/podcast/:id" render={props => <PodcastEpisodeList episodes={episodes} {...props} />} />
                <Route exact path="/podcast/:id/episode/:episodeId" render={props => <PodcastEpisodeDetail episodes={episodes} {...props} />} />
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        podcast: state.podcastsReducer.podcast,
        episodes: state.podcastsReducer.episodes,
    };
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(ACTIONS, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);
