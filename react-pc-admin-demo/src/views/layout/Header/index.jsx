import React from "react";
import { connect } from "react-redux";
import { Icon, Menu, Dropdown, Modal, Layout, Avatar } from "antd";
import { Link, withRouter } from "react-router-dom";
import { tologout } from "@/store/actions";
import Hamburger from "@/components/Hamburger";
import BreadCrumb from "@/components/BreadCrumb";
import "./index.less";
const { Header } = Layout;

const LayoutHeader = (props) => {
  const {
    userInfo,
    sidebarCollapsed,
    tologout,
    history
  } = props;

  const handleLogout = () => {
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        tologout()
        .then(() => {
          history.push('/login');
        })
      },
    });
  };  

  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout();
        break;       
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">首页</Link>
      </Menu.Item>
      <Menu.Item key="project">
        <a
          target="_blank"
          href="https://www.baidu.com/"
          rel="noopener noreferrer"
        >
          百度
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">退出</Menu.Item>
    </Menu>
  );
  const computedStyle = () => {
    let styles;
    if (sidebarCollapsed) {
      styles = {
        width: "calc(100% - 80px)",
      };
    } else {
      styles = {
        width: "calc(100% - 200px)",
      };
    }
    return styles;
  };
  return (
    <>
      {/* 这里是仿照antd pro的做法,如果固定header，
      则header的定位变为fixed，此时需要一个定位为relative的header把原来的header位置撑起来 */}
      <Header />
      <Header
        style={computedStyle()}
        className="fix-header"
      >
        <Hamburger />
        <BreadCrumb />
        <div className="right-menu">
          <div className="dropdown-wrap">
            <Dropdown overlay={menu}>
              <div>
                <Avatar shape="square" size="medium" src={userInfo.avatar} />
                <Icon style={{ color: "rgba(0,0,0,.3)" }} type="caret-down" />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user
  };
};
export default withRouter(
  connect(mapStateToProps, { tologout })(LayoutHeader)
);
