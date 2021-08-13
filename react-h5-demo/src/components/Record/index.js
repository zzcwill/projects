import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.less";

class Record extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.refDiv = React.createRef();
		this.refDiv2 = React.createRef();
		this.refDiv3 = React.createRef();
		this.refDivNo = React.createRef();
    this.getRef = this.getRef.bind(this);
  }

  getRef() {
		console.info(this)
		console.info(this.refDiv.current.innerText)
		// console.info(this.refDiv.current.getAttribute('class'))
  }	

  getRef2 = () => {
		console.info(this)
		console.info(this.refDiv2.current.innerText)
  }

	getRef3() {
		console.info(this)
		console.info(this.refDiv3.current.innerText)
	}

	getRefNo() {
		console.info(this)
		// console.info(this.refDivNo.current.innerText)
	}	

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div className="record" >
				<div className="record-item" ref={this.refDiv} onClick={this.getRef} >ref-record</div>
				<div className="record-item2" ref={this.refDiv2} onClick={this.getRef2} >ref-record2</div>
				<div className="record-item3" ref={this.refDiv3} onClick={this.getRef3.bind(this)} >ref-record3</div>
				<div className="record-item-no" ref={this.refDiv4} onClick={this.getRefNo} >ref-record-no</div>
      </div>
    );
  }
}

export default Record;