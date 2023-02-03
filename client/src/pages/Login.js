import React from "react";
import { Form, Input } from "antd";
import "../styles/RegisterStyles.css";
import { Link } from "react-router-dom";

const Register = () => {
  //   form handler

  const onFinishHandler = (values) => {
    console.log(values);
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
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button type="submit" className="btn btn-primary ">
            Login
          </button>{" "}
          <br></br>
          <Link to="/register" className="m-2 mt-5">
            Not a register user
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Register;
