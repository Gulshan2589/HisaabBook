import React, { useState} from "react";
import { Form, message, Input } from "antd";
import { Link, useNavigate  } from "react-router-dom";
import "./Authentication.css";
import Spinner from "./spinner";
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
        setLoading(true);
        const response = await axios.post('/api/users/login', values);
        localStorage.setItem("HisabbookUser", JSON.stringify({ ...response.data, Password: '' }));
        message.success("Login Successful ");
        setLoading(false);
        navigate("/");
    } catch (error) {
        message.error('Login Faield');
        setLoading(false);
    }
};

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className=" foem col-md-4">
          <Form className="form" layout="vertical" onFinish={onFinish}>
            <h1>HisaabBook Login</h1>
            <hr />
            <Form.Item  className='label-auth' label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item className='label-auth' label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link id="reglink" to="/register">Not Registered Yet, Click Here To Register</Link>
              <button className="primary" type="submit">
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login