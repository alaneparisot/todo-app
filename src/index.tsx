import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, compose, createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './containers/App'
import taskReducer from './reducers/taskReducer'
import * as serviceWorker from './serviceWorker'
import './index.css'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: typeof compose
  }
}

const store = createStore(
  combineReducers({
    task: taskReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
