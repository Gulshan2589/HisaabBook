import React ,{useState} from "react";
import { Form, message, Input } from "antd";
import { Link, useNavigate} from "react-router-dom";
import "./Authentication.css";
import Spinner from "./spinner";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      {loading && <Spinner/>}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-4">
          <Form className="form" layout="vertical" onFinish={onFinish}>
            <h1>HisaabBook Register</h1>
            <hr />
            <Form.Item  className='label-auth' label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item  className='label-auth' label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item  className='label-auth' label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link id="reglink" to="/login">Already Registered , Click Here To Login</Link>
              <button className="primary" type="submit">
                REGISTER
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register