// import { User, } from '@challenge/models'

import { StoreState, UserStoreState, }  from '../redux'

const getUserStore = (store: StoreState): UserStoreState => store.user

const getNotifications = (store: StoreState): any | null | undefined => getUserStore(store).user?.notifications

export default {
  getNotifications,
}
