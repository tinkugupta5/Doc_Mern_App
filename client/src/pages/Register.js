import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import "../styles/RegisterStyles.css";
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
   const dispatch =  useDispatch();
  //   form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading())
      console.log(res, "this is my res in my app");
      if (res.data.success) {
        message.success("Register Sucessfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something webnt wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-2">
            Already a register user
          </Link>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
