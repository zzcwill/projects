import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import indexModule from "./index.module.less";
import cssModule from "./css.module.less";

const Css = (props) => {
  const { userInfo, history } = props;

	console.info(history.location.state)
	console.info(`路由传参:${history.location.state.name}`)

  return (
    <div>
      <div className={indexModule.indexClass}>indexModule</div>
			<br />
			<div className={indexModule['index-code']}>indexModule</div>
			<br />
			<div className={cssModule.cssClass}>cssModule</div>
  </div>
  );
};


const mapStateToProps = (state) => {
  return {
    ...state.user
  };
};
export default withRouter(
  connect(mapStateToProps)(Css)
);
