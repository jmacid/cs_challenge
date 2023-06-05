import { User, } from '@challenge/models'
import React, { useState } from 'react'
import { connect, } from 'react-redux'
import { withRouter, } from 'react-router'
import { Dispatch, } from 'redux'

import { SecondaryButton, } from '@/components'
import { ActionCreators,StoreState, } from '@/redux'
import selectors from '@/selectors'

import Strings, { Images, } from '../../constants'
import styles from './styles.scss'

interface Props {
  id: number
  message: string,
}

export const NotificationCard = ({ notification, }: any) => {
  const [seen, setSeen,] = useState(notification.seen);


  const markAsSeen = () =>{
    setSeen(true);
    // TODO - communicate with backend to set seen as true
  } 

  return (
    <div
      className={seen ? styles.container : styles.unseenContainer}
      onClick={() => markAsSeen()}
      role="button"
    >
      <img
        className={styles.logo}
        src={(notification.notification_type === 'WL') ? Images.success : Images.error}
        alt={Strings.general.clearsummit}
      />
      <div key={notification.id} className={styles.title}>{notification.message}</div>
    </div>
  )
}

export default NotificationCard
