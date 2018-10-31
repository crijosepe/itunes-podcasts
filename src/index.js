import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Header from './Containers/Header';
import ErrorBoundary from './Components/ErrorBoundary';
import PodcastList from './Containers/PodcastList';
import PodcastDetail from './Containers/PodcastDetail';
import reducers from './reducers';

import './index.scss';

const store = createStore(reducers, applyMiddleware(thunk));
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Header />
                <ErrorBoundary>
                    <Route exact path="/" component={PodcastList} />
                    <Route path="/podcast/:id" component={PodcastDetail} />
                </ErrorBoundary>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
