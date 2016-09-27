import {
  createStore,
  applyMiddleware
} from 'redux'
import defaultState from './defaultState'
import reducers from 'reducers/index'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'


export default function() {
  return createStore(reducers, defaultState,
    applyMiddleware(
      thunkMiddleware,
      createLogger()
    )
  )
}
