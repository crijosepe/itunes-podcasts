import * as TYPES from './types';

import Api from '../Utils/Api';
import Format from '../Utils/Format';
import Storage from '../Utils/Storage';

import { addLoading, removeLoading } from './loading';

const CORS_PROXY = 'https://cors.io/?';

const REQUESTS = {
    FETCH_PODCASTS: {
        storageKey: 'podcastsList',
        url: 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
    },
    FETCH_PODCAST: {
        storageKey: 'podcast',
        url: 'https://itunes.apple.com/lookup',
    },
};

export function initializePodcast(podcast) {
    return (dispatch) => {
        dispatch({
            type: TYPES.FETCH_PODCAST,
            payload: podcast,
        });
    };
}

export function cleanEpisodes() {
    return (dispatch) => {
        dispatch({
            type: TYPES.CLEAN_EPISODES,
        });
    };
}

export function fetchPodcasts() {
    return (dispatch) => {
        dispatch(addLoading());
        const requestProperties = REQUESTS.FETCH_PODCASTS;
        const { storageKey, url } = requestProperties;
        const data = Storage.getItem(storageKey);
        if (!data) {
            Api.fetchJson(url)
                .then((response) => {
                    if (response.feed && response.feed.entry) {
                        try {
                            const items = response.feed.entry.map(Format.parsePodcast);
                            dispatch({
                                type: TYPES.FETCH_PODCASTS,
                                payload: items,
                            });

                            Storage.saveItem(storageKey, items);
                            dispatch(removeLoading());
                        } catch (e) {
                            console.error(e);
                        }
                    }
                });
        } else {
            dispatch({
                type: TYPES.FETCH_PODCASTS,
                payload: data,
            });
            dispatch(removeLoading());
        }
    };
}

export function fetchPodcastById(podcastId) {
    return (dispatch, getState) => {
        dispatch(addLoading());
        dispatch(cleanEpisodes());
        const requestProperties = REQUESTS.FETCH_PODCAST;
        const { storageKey, url } = requestProperties;
        const key = `${storageKey}_${podcastId}`;
        const data = Storage.getItem(key);
        if (!data) {
            Api.fetchJson(`${CORS_PROXY}${url}?id=${podcastId}`)
                .then((response) => {
                    Api.fetchXml(`${CORS_PROXY}${response.results[0].feedUrl}`)
                        .then((json) => {
                            if (json) {
                                try {
                                    const item = Format.parsePodcastDetail(json.rss.channel[0]);
                                    const savedPodcast = getState().podcastsReducer.podcast;
                                    if (!savedPodcast) {
                                        dispatch(initializePodcast(Object.assign({
                                            id: podcastId,
                                        }, item)));
                                    }

                                    dispatch({
                                        type: TYPES.FETCH_EPISODES,
                                        payload: item.episodes,
                                    });

                                    Storage.saveItem(key, item);
                                    dispatch(removeLoading());
                                } catch (e) {
                                    console.error(e);
                                }
                            } else {
                                console.error('Error retrieving data');
                            }
                        });
                });
        } else {
            dispatch(initializePodcast(data));
            dispatch({
                type: TYPES.FETCH_EPISODES,
                payload: data.episodes,
            });
            dispatch(removeLoading());
        }
    };
}
