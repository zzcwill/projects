import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import Logo from "./Logo";
import Menu from "./Menu";
const { Sider } = Layout;

const LayoutSider = (props) => {
  const { sidebarCollapsed } = props;
  return (
    <Sider
      collapsible
      collapsed={sidebarCollapsed}
      trigger={null}
      style={{ zIndex: "10" }}
    >
      <Logo />
      <Menu />
    </Sider>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app
  };
};
export default connect(mapStateToProps)(LayoutSider);
