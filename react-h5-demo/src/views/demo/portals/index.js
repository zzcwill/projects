import React, { useState, useEffect, useRef } from "react";
import ReactDOM, { createPortal } from 'react-dom';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.less";

import BaseLayout from '@/components/BaseLayout'

const Modal = ({title, text, isOpen, onClose, children}) => {
  let Children = null
  if (children) {
    Children = children
  } 

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="Popup" v-show="visible">
      <div className="mask"></div>
      <div className="content">
        <div className="top">
          <div className="title">{title}</div>
          <div className="txt">{text}</div>
        </div>
        <div className="center">
          {/* 组件一定要大写 */}
          <Children />
        </div>
        <div className="bottom">
          <button onClick={onClose}>确定</button>
        </div>
      </div>
    </div>
  , document.body)
}

const Modal2 = ({title, text, isOpen, onClose, children}) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="Popup" v-show="visible">
      <div className="mask"></div>
      <div className="content">
        <div className="top">
          <div className="title">{title}</div>
          <div className="txt">{text}</div>
        </div>
        <div className="center">
          {children()}
        </div>
        <div className="bottom">
          <button onClick={onClose}>确定</button>
        </div>
      </div>
    </div>
  , document.body)
}

const Modal3 = ({title, text, isOpen, onClose, children}) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="Popup" v-show="visible">
      <div className="mask"></div>
      <div className="content">
        <div className="top">
          <div className="title">{title}</div>
          <div className="txt">{text}</div>
        </div>
        <div className="center">
          {children}
        </div>
        <div className="bottom">
          <button onClick={onClose}>确定</button>
        </div>
      </div>
    </div>
  , document.body)
}

const Portals = (props) => {
  const { userInfo, history } = props;

  const [open, setOpen] = useState(false)

  const [open2, setOpen2] = useState(false)

  const [open3, setOpen3] = useState(false)

  useEffect(() => {
  })
  
  // debugger

  const hocChildren = (Component) => {
    // return <Component />
    return <BaseLayout />
  } 

  return (
    <div className="component">
      <div onClick={() => setOpen(true)}>Portals-脱离节点渲染-传组件</div>
      <Modal
        title="tip-title"
        text="text-text"
        isOpen={open}
        onClose={() => setOpen(false)}
        children={BaseLayout}
      />

      <br />
      <div onClick={() => setOpen2(true)}>Portals-脱离父组件2-传组件2</div>
      <Modal2
        title="tip-title2"
        text="text-text2"
        isOpen={open2}
        onClose={() => setOpen2(false)}
        children={hocChildren}
      />  
      <br />
      <div onClick={() => setOpen3(true)}>Portals-脱离父组件3-传组件3</div>
      <Modal3
        title="tip-title3"
        text="text-text3"
        isOpen={open3}
        onClose={() => setOpen3(false)}
      >
        <BaseLayout />
      </Modal3>     
    </div>
  )
};


const mapStateToProps = (state) => {
  return {
    ...state.user
  };
};
export default withRouter(
  connect(mapStateToProps)(Portals)
);

