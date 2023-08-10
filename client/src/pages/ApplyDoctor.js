import React from 'react'
import Layout from "../components/Layout";
import { Input,Row,Form,Col,TimePicker, message,Badge } from 'antd'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import axios from 'axios'

const ApplyDoctor = () => {

const {user} = useSelector( state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleFinish = async(values) => {
    console.log(values)

    try {
      dispatch(showLoading());
      const res =  await axios.post('/api/v1/user/apply-doctor',{...values,userId:user._id},{
        headers:{
          Authorization:`Bearer${localStorage.getItem('token')} `
        }
      })

      dispatch(hideLoading())

      if(res.data.success){
        message.success(res.data.success)
        navigate('/')
      }else
      {
        message.error(res.data.success)
      }
      
    } catch (error) {
      dispatch(hideLoading)
      console.log(error)
      message.error('something went wrong')
    }

  }
  return (
    <Layout>
        <h1 className='text-center' >Apply Doctor</h1>
        <Form layout="vertical" onFinish={handleFinish} className='m-3'>
        <h4>Personal Details</h4>
          <Row gutter={20}>            
            <Col xs={24} md={24} lg={8}>
              <Form.Item label=" First Name" name="firstName" required rules={[{required:true}]}>
                <Input type='text' placeholder='your name' />
              </Form.Item>             
            </Col>
            <Col xs={24} md={24} lg={8} m-3>
            <Form.Item label=" Last Name" name="lastName" required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter your lastname' />
              </Form.Item>            
            </Col>
            <Col xs={24} md={24} lg={8} m-3>
            <Form.Item label=" Phone Number" name="phone" required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter your Phone Number' />
              </Form.Item>            
            </Col>
            <Col xs={24} md={24} lg={8} m-3>
            <Form.Item label="Email" name="email" required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter your email' />
              </Form.Item>            
            </Col>
            <Col xs={24} md={24} lg={8} m-3>
            <Form.Item label=" website" name="website" required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter your website' />
              </Form.Item>            
            </Col>
            <Col xs={24} md={24} lg={8} m-3>
            <Form.Item label=" Address" name="address" required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter your address' />
              </Form.Item>            
            </Col>
          </Row>
          <h4>Professional Details</h4>
          <Row gutter={20}>            
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]}>
                <Input type='text' placeholder='your specialization' />
              </Form.Item>             
            </Col>
            <Col xs={24} md={24} lg={8} m-3>
            <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>
                <Input type='text' placeholder='your experience' />
              </Form.Item>            
            </Col>
                       
            <Col xs={24} md={24} lg={8} m-3>
            <Form.Item label="Fees Per Cunsaltation" name="feesPerCunsaltation" required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter fees Per Cunsaltation' />
              </Form.Item>            
            </Col>            
            <Col xs={24} md={24} lg={8} m-3>
            <Form.Item label="Timings" name="timings" required >
               <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>            
            </Col>            
          </Row>
          <div className='d-flex justify-content-end'>
              <button className='btn btn-primary' type='submit'>Submit</button>
          </div>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor


// doc