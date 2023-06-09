import { dispatchReducer, runReducers, } from '@clearsummit/radio-dispatch'

import { SignUpResponse, NotificationResponse } from '@/redux/api-payloads'

import { UserStoreState, } from './index.ts'

// User Actions
export const ACTIONS = {
  SET_USER_SESSION: 'SET_USER_SESSION',
  CREATE_USER: 'CREATE_USER',
  STORE_USER: 'STORE_USER',
  START_REQUEST: 'USER/START_REQUEST',
  END_REQUEST: 'USER/END_REQUEST',
  FAILURE_CREATE_USER: 'FAILURE_CREATE_USER',
  LOGOUT: 'LOGOUT',
  GET_NOTIFICATIONS_SUCCESS: 'GET_NOTIFICATIONS_SUCCESS',
}

export const INITIAL_STATE: UserStoreState = {
  user: null,
  pending: false,
  error: null,
}

const loginSuccess = (state: UserStoreState, payload: SignUpResponse) => ({
    ...state,
    user: payload.data.user,
})

const storeUser = (state: UserStoreState) => ({
  ...state,
})

const signUpFailure = (state: UserStoreState, payload: SignUpResponse) => ({
  ...state,
  error: payload.details,
})


const logOut = (state: UserStoreState): UserStoreState => ({
  ...state,
  user: null,
})

const notifications = (state: UserStoreState, payload: any): any => {
  const newState = 
  {
    ...state,
  }
  newState.user.notifications = payload.data.data;
  return newState;
}


export const reduxSet = {
  // @ts-ignore
  loginSuccess: dispatchReducer<UserStoreState, SignUpResponse>(
    ACTIONS.SET_USER_SESSION,
    loginSuccess
  ),
  // @ts-ignore
  dispatchStoreUser: dispatchReducer<UserStoreState, { [key: string]: string }>(
    ACTIONS.STORE_USER,
    storeUser
  ),
  signUpSuccess: dispatchReducer<UserStoreState>(
    ACTIONS.CREATE_USER,
    loginSuccess
  ),
  signUpFailure: dispatchReducer<UserStoreState, SignUpResponse>(
    ACTIONS.FAILURE_CREATE_USER,
    signUpFailure
  ),
  logOut: dispatchReducer<UserStoreState, null>(
    ACTIONS.LOGOUT,
    logOut
  ),
  notifications: dispatchReducer<UserStoreState, NotificationResponse>(
    ACTIONS.GET_NOTIFICATIONS_SUCCESS,
    notifications
  ),
}

export const reducer = (
  state: UserStoreState = { ...INITIAL_STATE, },
  action: StandardAction
): UserStoreState => runReducers(state, action, reduxSet)
