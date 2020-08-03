import React from "react";
import { Row, Col } from "antd";
import "./index.less";

const Dashboard = () => {
  return (
    <div className="app-container">
      <Row gutter={32}>
        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            首页
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
