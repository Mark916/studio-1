import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import arrays from './arrays'
import alarms from './alarms'
import * as keys from './keys'
import { Notify } from 'quasar'

Vue.use(Vuex)

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    let type = mutation.type
    try {
      if (type === 'server' || type === 'quit') {
        window.sessionStorage.setItem(keys.SERVER_STATE, JSON.stringify(state.user.server))
      }
      if (type === 'domain' || type === 'quit') {
        window.sessionStorage.setItem(keys.DOMAIN_STATE, JSON.stringify(state.user.domain))
      }
      if (type === 'token' || type === 'quit') {
        window.sessionStorage.setItem(keys.TOKEN_STATE, JSON.stringify(state.user.token))
      }
      if (type === 'login' || type === 'logout') {
        window.sessionStorage.setItem(keys.LOGIN_STATE, JSON.stringify(state.user.logined))
        window.sessionStorage.setItem(keys.USER_STATE, JSON.stringify(state.user.user))
      }
      if (type === 'report' || type === 'delete' || type === 'clear' || type === 'read' || type === 'unread') {
        let user = JSON.parse(sessionStorage.getItem(keys.USER_STATE)).username
        window.localStorage.setItem(user + '.' + keys.ALARM_DETAILS_STATE, JSON.stringify(state.alarms.alarmDetails))
      }
    } catch (e) {
      Notify.create({
        message: '请检查存储空间。'
      })
    }
  })
}

const store = new Vuex.Store({
  modules: {
    user,
    arrays,
    alarms
  },
  plugins: [localStoragePlugin]
})

export default store
