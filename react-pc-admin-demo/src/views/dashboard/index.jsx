import React from "react";
import { Row, Col, Alert } from "antd";
import "./index.less";

const Dashboard = () => {
  return (
    <div>
      <Row gutter={32}>
        <Col xs={24} sm={24} lg={24}>
          <Alert message="首页" type="info" />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

