import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.less";

import Record from '@/components/Record'

const RefPage = (props) => {
  const { userInfo, history } = props;

	const textInput = useRef(null);
	const recordRef = useRef(null);

  const getRef = (item) => {
		console.info(textInput.current.innerText)
		console.info(textInput.current.getAttribute('class'))
		console.info(textInput.current.getAttribute('data-id'))		
  }

  const getRecordRef = (item) => {
		console.info(recordRef)
		recordRef.current.getRef()
  }	

  useEffect(() => {
    console.info(2)
  })

  console.info(1)


  return (
    <div className="RefPage">
			<div className="m-t-10 text-c" onClick={getRef} ref={textInput} data-id="txt">getRef</div>
			<br />
			<Record ref={recordRef} />
			<div className="m-t-6 text-c" onClick={getRecordRef}>getRecordRef</div>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    ...state.user
  };
};
export default withRouter(
  connect(mapStateToProps)(RefPage)
);

