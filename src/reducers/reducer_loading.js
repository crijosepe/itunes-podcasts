import * as TYPES from '../actions/types';

const INITIAL_STATE = { loading: false };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TYPES.ADD_LOADING:
            return { ...state, loading: true };
        case TYPES.REMOVE_LOADING:
            return { ...state, loading: false };
        default:
            return state;
    }
}
