import React, { Component } from "react";
import { Row, Col, Alert } from "antd";
import { withRouter } from "react-router-dom";
import Qs from 'qs';
import "./index.less";
import {
  loanApprovalInfoGetApprovalDocumentDir,
  loanApprovalInfoGetApprovalDocument,
  // loanDocumentUploadFileString,
  // uploadNew
} from '@/api/wdrw/wdrw'
import { Tree } from 'antd';
const { TreeNode } = Tree;

let imgTreeData = []

class Page extends Component {
  state = {
  };

  componentDidMount() {
    this._isMounted = true;
    this.getLoanDocumentDirInfo();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  getLoanDocumentDirInfo = async () => {
    //自行改接扣调用
    console.info(this.props.history.location)
    let search = this.props.history.location.search;
    let query = Qs.parse(search.substring(1, search.length));
    let params = {
      loanApplyId: query.projectId,
      fileNamespace: query.space,
      releventFlow: query.releventFlow,
      releventFlowNode: query.releventFlowNode,
    };
    let apiData = await loanApprovalInfoGetApprovalDocumentDir(params);
    let imgArr = [];
    imgArr.push(apiData.data);

    imgTreeData = imgArr;
  };

  getImgList = async (selectedKeys, info) => {
    // console.log(info.node.props.dataRef);
    let search = this.props.history.location.search;
    let query = Qs.parse(search.substring(1, search.length));
    let params = {
      loanApplyId: query.projectId,
      fileNamespace: query.space,
      releventFlow: query.releventFlow,
      releventFlowNode: query.releventFlowNode,
      dirId: info.node.props.dataRef.id,
    };
    let apiData = await loanApprovalInfoGetApprovalDocument(params)
    console.log(apiData.data)
  };
 
  renderTreeNodes = (data) => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} {...item} dataRef={item} />;
    })
  };

  render() {
    return (
      <div>
        <Row gutter={32}>
          <Col xs={12} sm={12} lg={12}>
            <Tree
              defaultExpandAll={true}
              onSelect={this.getImgList}
            >
              {this.renderTreeNodes(imgTreeData)}
            </Tree>
          </Col>
          <Col xs={12} sm={12} lg={12}>
            <Alert message="demo" type="info" />
          </Col>
        </Row>
      </div>
    );
  }
};

export default withRouter(Page);