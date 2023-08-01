import React from "react";
import { Form, Input, message } from "antd";
import "../styles/RegisterStyles.css";
import axios from "axios";
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch =  useDispatch();
  //  <!=============== Form handler ===============>
  const onFinishHandler = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading())
      if (res.data.success) {
        console.log("here token value is ", res.data.success);
        localStorage.setItem("token", res.data.token);
        message.success("Login Sucessfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("something went wrong");
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
          <h3 className="text-center">Login Form</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button type="submit" className="btn btn-primary ">
            Login
          </button>
          <br></br>
          <Link to="/register" className="m-2 mt-5">
            Not a Registered user
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Login;
