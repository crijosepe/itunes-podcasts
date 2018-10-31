import * as TYPES from './types';

export function addLoading() {
    return (dispatch) => {
        dispatch({
            type: TYPES.ADD_LOADING,
        });
    };
}

export function removeLoading() {
    return (dispatch) => {
        dispatch({
            type: TYPES.REMOVE_LOADING,
        });
    };
}
