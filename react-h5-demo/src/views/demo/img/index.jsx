import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import "./index.less";

import img from '@/assets/common/1.jpg'

const Img = (props) => {
  const { userInfo, history } = props;

  const [imgUrl, setImgUrl] = useState(img);

  const codeFilter = (value) => {
    let arr = ['no', 'yes']
    return arr[value] || '-'
  }

  return (
    <div>
      <div>img</div>
      <br />
      <br />
      <div>
        <img src={imgUrl} alt="" />
      </div>
      <br />
      <div> { codeFilter(0) } </div>
  </div>
  );
};


const mapStateToProps = (state) => {
  return {
    ...state.user
  };
};
export default withRouter(
  connect(mapStateToProps)(Img)
);
