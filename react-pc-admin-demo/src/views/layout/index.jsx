import React from "react";
// import { connect } from "react-redux";
import Content from "./Content";
import Header from "./Header";
import Sider from "./Sider";
import TagsView from "./TagsView";
import { Layout } from "antd";
const Main = (props) => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: '#fff' }}>
      <Sider />
      <Layout>
        <Header />
        <TagsView />
        <Content />
      </Layout>
    </Layout>
  );
};
export default Main;
