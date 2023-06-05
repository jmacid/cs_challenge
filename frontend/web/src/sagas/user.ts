import { User, } from '@challenge/models'
import { call, } from 'redux-saga/effects'

import Strings, { Routes, } from '@/constants'
// import Strings from '@/constants'
import { deleteAuth, setAuth, } from '@/helpers/auth'
import history from '@/helpers/history'

import ApiService from '../helpers/ApiService'
import services from '@/helpers/services'

function setAuthHeader(action: {
  type: string,
  payload: { data: { user: User } },
}){
  // @ts-ignore
  ApiService.setAuthHeader(action.payload.data.user.token.access)
  setAuth(action.payload.data.user.token)  
}

// eslint-disable-next-line no-unused-vars
export function* setUserSession(action: {
  type: string,
  payload: { data: { user: User } },
}): GeneratorType {
  setAuthHeader(action)  
  yield services.createNewNotification(
    {
      "seen": false,
      "message": Strings.login.loginNotificationMessage,
      "notification_type": Strings.login.notification_type,
    }
)
  yield call(history.push, Routes.Home)
}

// eslint-disable-next-line no-unused-vars
export function* createUser(action: {
  type: string,
  payload: { data: { user: User } },
}): GeneratorType {
  setAuthHeader(action)  
  yield services.createNewNotification(
    {
      "seen": false,
      "message": Strings.signUp.signUpNotificationMessage,
      "notification_type": Strings.signUp.notification_type,
    }
)
  yield call(history.push, Routes.Home)
}


export function* logout(): GeneratorType {
  yield call(deleteAuth)
  yield call(history.push, Routes.Login)
}



export default { setUserSession, createUser, }
