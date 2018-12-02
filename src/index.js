import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from './state/reducer';
import state from './state/state';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { loadStoresAction, loadLocationsAction, loadStoreTypesAction } from './state/actions.js';
import { decodeStores, decodeLocations, decodeStoreTypes } from './data/dataDecoder.js';

const store = createStore(reducer, state, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

fetch('data/stores.json')
    .then((response) => response.json())
    .then((storesJson) => {
        const stores = decodeStores(storesJson);
        store.dispatch(loadStoresAction(stores));
    });

fetch('data/store-types.json')
    .then((response) => response.json())
    .then((storeTypesJson) => {
        const storeTypes = decodeStoreTypes(storeTypesJson);
        store.dispatch(loadStoreTypesAction(storeTypes));
    });

fetch('data/locations.json')
    .then((response) => response.json())
    .then((locationsJson) => {
        const locations = decodeLocations(locationsJson);
        store.dispatch(loadLocationsAction(locations));
    });