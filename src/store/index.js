import {
  createStore,
  applyMiddleware
} from 'redux'
import defaultState from './defaultState'
import reducers from 'reducers/index'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import _ from 'lodash'


export default function() {
  return createStore(reducers, _.cloneDeep(defaultState),
    applyMiddleware(
      thunkMiddleware,
      createLogger()
    )
  )
}
