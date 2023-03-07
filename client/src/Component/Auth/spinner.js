import React from "react";
import { Space, Spin } from 'antd';

function Spinner() {
  return (
      <Space className="spinner"  >
        <Spin className="spin"  tip="Loading..." size="large" />
      </Space>
  );
}

export default Spinner;
