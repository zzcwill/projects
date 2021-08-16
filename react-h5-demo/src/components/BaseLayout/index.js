import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.less";

class BaseLayout extends React.Component {
  constructor(props) {
    super(props);
		this.name = 'base'
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div className="BaseLayout" >
				BaseLayout
      </div>
    );
  }
}

export default BaseLayout;