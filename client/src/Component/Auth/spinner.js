import React from "react";
import { Space, Spin } from 'antd';
import './Authentication.css';

function Spinner({ text = 'Loading...' }) {
  return (
      <Space className="spinner"  >
        <Spin className="spin" tip={text} size="large" />
      </Space>
  );
}

export default Spinner;
