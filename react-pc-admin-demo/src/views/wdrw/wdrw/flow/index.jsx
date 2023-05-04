import React from "react";
import { Row, Col, Alert } from "antd";
import { withRouter } from "react-router-dom";
import "./index.less";

const Page = (props) => {
  const { history } = props;
  console.info(history.location)

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

export default withRouter(Page);

