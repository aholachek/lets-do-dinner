
import React from 'react'
import ReactDOM from 'react-dom'
import App from './Main'
import { Provider } from 'react-redux'
import createStore from 'store/index'



// Render the main component into the dom
ReactDOM.render(
  <Provider store={createStore()}>
    <App/>
 </Provider>,
  document.getElementById('app'));
