import React from 'react'
import Layout from "../components/Layout";
import { Input,Row,Form,Col } from 'antd'

const ApplyDoctor = () => {

  const handleFinish = (values) => {
    console.log(values)

  }
  return (
    <Layout>
        <h1 className='text-center' >Apply Doctor</h1>
        <Form layout="vertical" onFinish={handleFinish} className='m-3'>
        <h6 className='text-light'>Personal Details</h6>
          <Row>            
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
            <Form.Item label=" Last Name" name="lastName" required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter your lastname' />
              </Form.Item>            
            </Col>
          </Row>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor