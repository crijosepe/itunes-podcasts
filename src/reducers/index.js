import { combineReducers } from 'redux';

import podcastsReducer from './reducer_podcasts';
import loadingReducer from './reducer_loading';

export default combineReducers({
    podcastsReducer,
    loadingReducer,
});
