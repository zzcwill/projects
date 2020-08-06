import React, { Component } from "react";
import {
  Table,
  Form,
  Button,
  Input,
  Collapse,
  Pagination,
  Divider,
  message
} from "antd";

import { zaRoleList, zaRoleAdd, zaRoleUpdate } from "@/api/wdrw/qxgl";
const { Column } = Table;
const { Panel } = Collapse;
class Page extends Component {
  _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  state = {
    list: [],
    loading: false,
    total: 0,
    listQuery: {
      page: 1,
      pageSize: 10,
      name: ''
    },
    editModalVisible: false,
    editModalLoading: false,
    currentRowData: {
      id: 0,
      author: "",
      date: "",
      readings: 0,
      star: "★",
      status: "published",
      title: ""
    }
  };
  fetchData = () => {
    this.setState({ loading: true });
    zaRoleList(this.state.listQuery).then((res) => {
      this.setState({ loading: false });
      const list = res.data;
      const totalItem = res.totalItem;
      if (this._isMounted) {
        this.setState({ list, totalItem });
      }
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  filterTitleChange = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        name:value,
      }
    }));
  };
  filterStatusChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        status:value,
      }
    }));
  };
  filterStarChange  = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        star:value,
      }
    }));
  };
  changePage = (page, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          page,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };
  changePageSize = (current, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          page: 1,
          pageSize,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };
  handleDelete = (row) => {
  }
  handleEdit = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editModalVisible: true,
    });
  };

  handleOk = _ => {
    const { form } = this.formRef.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        'star': "".padStart(fieldsValue['star'], '★'),
        'date': fieldsValue['date'].format('YYYY-MM-DD HH:mm:ss'),
      };
      this.setState({ editModalLoading: true, });
      zaRoleUpdate(values).then((response) => {
        form.resetFields();
        this.setState({ editModalVisible: false, editModalLoading: false });
        message.success("编辑成功!")
        this.fetchData()
      }).catch(e => {
        message.success("编辑失败,请重试!")
      })
      
    });
  };

  handleCancel = _ => {
    this.setState({
      editModalVisible: false,
    });
  };
  render() {
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="角色名称:">
                <Input onChange={this.filterTitleChange} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.fetchData}>
                  查询
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <br />
        <Table
          bordered
          rowKey={(record) => record.id}
          dataSource={this.state.list}
          loading={this.state.loading}
          pagination={false}
        >
          <Column title="角色名称" dataIndex="name" key="name" align="center" sorter={(a, b) => a.id - b.id}/>
          <Column title="角色描述" dataIndex="note" key="note" align="center"/>
          <Column title="功能权限" dataIndex="menus" key="menus" align="center"/>
          <Column title="节点权限" dataIndex="nodes" key="nodes" align="center"/>
          <Column title="操作" key="action" align="center" width={160} render={(text, row) => (
            <span>
              <a onClick={this.handleEdit.bind(null,row)}>修改角色</a>
              <Divider type="vertical" />
              <a>删除</a>
            </span>
          )}/>
        </Table>
        <br />
        <Pagination
          total={this.state.total}
          pageSizeOptions={["10", "20", "40"]}
          showTotal={(total) => `共${total}条数据`}
          onChange={this.changePage}
          current={this.state.listQuery.page}
          onShowSizeChange={this.changePageSize}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage={true}
        /> 
      </div>
    );
  }
}

export default Page;
