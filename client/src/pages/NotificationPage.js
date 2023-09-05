import React from 'react'
import Layout from "./../components/Layout";
import {Tabs, message, notification} from 'antd'
import TabPane from 'antd/es/tabs/TabPane';
import { useSelector,useDispatch } from 'react-redux';
import { showLoading } from '../redux/features/alertSlice';


const NotificationPage = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const handleMarkAllRead = async() => {
        try {
            dispatch(showLoading)
        } catch (error) {
            console.log(error)
            message.error("Something went wrong")
        }

    }
    const handleDeleteAllRead = () => {

    }
  return (
    <Layout>
        <h1 className='pt-2 text-center'>NotificationPage</h1>
        <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
            <div className='d-flex justify-content-end'>
                <h4 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h4>
            </div>
            {
                user?.notification.map(notificationMsg => (
                    <div className='card' onClick={notificationMsg.onClickPath}>
                        <div className='card-text'>
                            {notificationMsg.message}
                        </div>
                    </div>
                ))
            }
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
            <div className='d-flex justify-content-end'>
                <h4 className='p-2' onClick={handleDeleteAllRead}>Delete All Read</h4>
            </div>
        </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage