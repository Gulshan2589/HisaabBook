import React, { useState } from "react";
import { Form, message, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Authentication.css";
import Spinner from "./spinner";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const myStyle = {
    width: '650px',
    height: '450px',
  };
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post('/api/users/register', values);
      message.success("Registration Successfull");
      setLoading(false);
      navigate("/");
    } catch (error) {
      message.error('Registration Faield');
      setLoading(false);
    }
  };

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="formcontainer">
        <div className="formregister">
          <Form className="forminput" layout="vertical" onFinish={onFinish}>
            <h1>HisaabBook Register</h1>
            <hr />
            <Form.Item className='label-auth' label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item className='label-auth' label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item className='label-auth' label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="button-container">
              <Link id="reglink" to="/login">Already Registered , Click Here To Login</Link>
              <button className="primary" type="submit">
                REGISTER
              </button>
            </div>
          </Form>
        </div>
        <div className="lottieanime">
          <dotlottie-player src="https://lottie.host/3fecd4a2-292d-4fa1-97a4-8ca7a52a7833/4gl6K5MJFA.json" background="transparent" speed="1"
            style={myStyle} loop autoplay></dotlottie-player>
        </div>
      </div>
    </div>
  )
}

export default Register