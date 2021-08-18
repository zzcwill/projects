import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.less";

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.refDiv = React.createRef();
		this.history = props.history;
		this.state = {
			name: 'life'
		}
		console.info('constructor')
  }

  getRef = () => {
		console.info(this)
		console.info(this.refDiv.current.innerText)
  }

  toRouter = () => {
    this.history.push({pathname: '/demo/index', state: { from: 'life' }});
  }	

	updateData = () => {
		this.setState({
			name: 'update-life'
		})
		console.info(this.state.name)
	}

	updateDataAsync = () => {
		this.setState({
			name: 'life'
		},()=>{
			console.info(this.state.name)
		})


	}

	// componentWillMount
	static getDerivedStateFromProps(nextProps, prevState) {
		console.info('getDerivedStateFromProps')
		return null	
	}

	componentDidMount() {
		console.info('componentDidMount')
	}


	// 更新
	// getDerivedStateFromProps() {
	// 	console.info('getDerivedStateFromProps')
	// }	
	shouldComponentUpdate() {
		console.info('shouldComponentUpdate')
		return true
	}
	getSnapshotBeforeUpdate() {
		console.info('getSnapshotBeforeUpdate')
		return true
	}
	componentDidUpdate() {
		console.info('componentDidUpdate')
	}

	componentWillUnmount() {
		console.info('componentWillUnmount')
	}

	componentDidCatch() {
		console.info('componentDidCatch')
	}


  render() {
		console.info('render')
    return (
      <div className="box" >
				<div className="record-item" ref={this.refDiv} onClick={this.getRef} >ref</div>
				<br />
				<div onClick={this.updateData}>update</div>
				<div onClick={this.updateDataAsync}>update-async</div>
				<br />
				<div onClick={this.toRouter}>unmount</div>
				<br />
      </div>
    );
  }
}

export default Record;