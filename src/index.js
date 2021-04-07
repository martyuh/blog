import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import App from './components/App';
import reducers from './reducers';

// call applymiddleware and pass in thunk this will allow redux to pass an action into thunk. thunk will then determine if it is an object or a function. if it is a function it will allow you to manually call dispatch. this allows you to make async calls within an action creator.
const store =createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
