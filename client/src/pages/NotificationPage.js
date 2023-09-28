import React from 'react'
import Layout from "./../components/Layout";
import {Tabs, message, notification} from 'antd'
import TabPane from 'antd/es/tabs/TabPane';
import { useSelector,useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user)
    const handleMarkAllRead = async() => {
        try {
            dispatch(showLoading)
            const res = await axios.post('/api/v1/user/get-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading)
            if(res.data.success)
            {
                message.success(res.data.message)
            }
            else{
                message.error(res.data.message)
            }
            
        } catch (error) {

            dispatch(hideLoading());
            console.log(error)
            message.error("something went wrong")
            
        }

    }
    const handleDeleteAllRead = async() => {
       

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
                    <div className='card'  style={{cursor:'pointer'}}>
                        <div className='card-text' onClick={() =>navigate(notificationMsg.onClickPath)}>
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
            {
            user?.seennotification.map(notificationMsg => (
                    <div className='card'  style={{cursor:'pointer'}}>
                        <div className='card-text' onClick={() =>navigate(notificationMsg.onClickPath)}>
                            {notificationMsg.message}
                        </div>
                    </div>
                ))

            }


        </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage