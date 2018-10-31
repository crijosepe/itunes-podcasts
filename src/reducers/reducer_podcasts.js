import * as TYPES from '../actions/types';

const INITIAL_STATE = { podcasts: [], podcast: null, episodes: [] };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TYPES.FETCH_PODCASTS:
            if (!action.payload) return state;
            return { ...state, podcasts: [...action.payload] };
        case TYPES.FETCH_PODCAST:
            if (!action.payload) return state;
            return { ...state, podcast: { ...action.payload } };
        case TYPES.FETCH_EPISODES:
            if (!action.payload) return state;
            return { ...state, episodes: [...action.payload] };
        case TYPES.CLEAN_EPISODES:
            return { ...state, episodes: [] };
        default:
            return state;
    }
}
