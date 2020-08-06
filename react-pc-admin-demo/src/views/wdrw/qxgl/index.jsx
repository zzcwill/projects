import React from "react";
import { Row, Col, Alert } from "antd";
import "./index.less";

const Page = () => {
  return (
    <div>
      <Row gutter={32}>
        <Col xs={24} sm={24} lg={24}>
          <Alert message="demo" type="info" />
        </Col>
      </Row>
    </div>
  );
};

export default Page;

