import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.less";

const Dashboard = (props) => {
  const { userInfo, history } = props;

  console.info(userInfo)

  return (
    <div>
      首页
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    ...state.user
  };
};
export default withRouter(
  connect(mapStateToProps)(Dashboard)
);

