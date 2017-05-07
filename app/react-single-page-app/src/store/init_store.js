import {
  compose,
  applyMiddleware,
  createStore,
  combineReducers
} from 'redux'

import {persistStore, autoRehydrate} from 'redux-persist'

/** 引入 Reducer **/
import {user} from "reducer"

/** 引入 middleware **/
import thunk from 'redux-thunk'

/**
 * 创建Redux-Store
 * @returns {*}
 */

export const init_store = async () => {
  const reducer = combineReducers({user});


  // 创建Store
  // compose函数是将多个函数组合起来
  // 这里是将所有的redux enhancer组合起来
  const store = compose(
    autoRehydrate(),
    applyMiddleware(thunk)
  )(createStore)(reducer)

  return new Promise ( (resolve, reject) => {
    const blacklist = ['']
    persistStore(store, {blacklist}, () => {
      resolve(store)
    })
  })
}
