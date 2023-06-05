import React, { useEffect, useState, } from 'react'


import { User, } from '@challenge/models'
import styles from './styles.scss'
import services from '@/helpers'
import { notificationPayload, } from '@/redux/api-payloads'
import { StoreState, } from '@/redux'

import { connect, } from 'react-redux'
import selectors from '@/selectors'

import { ApiPayload, reduxSet as apiAC, } from '@clearsummit/radio-dispatch'
import { Dispatch, } from 'redux'

import { NotificationCard, } from '@/components'

type StateProps = {
  user: User | null | undefined
  notifications: any
  error: string
}



export const HomepageScreen = (props:any) => {

  const { notifications: notificationsProps, } = props;
  const [notifications, setNotifications,] = useState([]);
  const { makeRequest, } = props
  
  const fetchData = () =>{  
    const np = notificationPayload(null)
    makeRequest(np)
  }


  useEffect( () => {
    fetchData()
  }
  ,[])

  useEffect( () =>{
    setNotifications(notificationsProps);

  }
    ,[notificationsProps,])


  return (
    <div>
      <div className={styles.container}>
        <h4>Home</h4>
        {
          notifications?.length > 0 &&
          notifications?.map( (n) => (<NotificationCard key={n.id} notification={n}/>))
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state: StoreState): StateProps => ({
  user: selectors.user.getUser(state),
  notifications: selectors.notifications.getNotifications(state),
  error: state.user.error,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  makeRequest: (payload: ApiPayload<typeof services, unknown>) => dispatch(apiAC.makeRequest.dispatch(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomepageScreen)
