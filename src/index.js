import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
import store from './redux/configureStore';

// const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : (f) => f));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
