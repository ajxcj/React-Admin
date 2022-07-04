import { createStore, combineReducers, applyMiddleware } from 'redux'//创建状态机对象，整合reducers，
import reducers from '../reducers'
import thunk from 'redux-thunk'
const store = createStore(
    combineReducers(reducers), //整合reducer
    applyMiddleware(thunk)
)
export default store