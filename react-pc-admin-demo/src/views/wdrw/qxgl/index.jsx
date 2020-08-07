import React, { Component } from "react";
import {
  Table,
  Form,
  Button,
  Input,
  Collapse,
  Pagination,
  message,
  Col,
  Row
} from "antd";

import { zaRoleList, zaRoleAdd, zaRoleUpdate } from "@/api/wdrw/qxgl";
import EditForm from "./forms/editForm"
import loadsh from "loadsh";
const { Column } = Table;
const { Panel } = Collapse;
class Page extends Component {
  _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  state = {
    list: [],
    loading: false,
    total: 0,    
    searchForm: {
      page: 1,
      pageSize: 10,
      name: ''
    },

    dialogForm: {
      name: '',
      note: '',
      id: ''
    },
    dialogFormVisible: false,
    dialogFormLoading: false,
    isNewPerson: true    
  };
  componentDidMount() {
    this._isMounted = true;
    this.handleSearch();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  filterTitleChange = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      searchForm: {
        ...state.searchForm,
        name: value,
      }
    }));
  };
  changePage = (page, pageSize) => {
    this.setState(
      (state) => ({
        searchForm: {
          ...state.searchForm,
          page,
        },
      }),
      () => {
        this.handleSearch();
      }
    );
  };
  changePageSize = (current, pageSize) => {
    this.setState(
      (state) => ({
        searchForm: {
          ...state.searchForm,
          page: 1,
          pageSize,
        },
      }),
      () => {
        this.handleSearch();
      }
    );
  }; 

  handleSearch = () => {
    this.setState({ loading: true });
    zaRoleList(this.state.searchForm).then((res) => {
      this.setState({ loading: false });
      const list = res.data;
      const total = res.totalItem;
      if (this._isMounted) {
        this.setState({ list, total });
      }
    });
  };  
  handleReset = () => {
    this.setState((state) => ({
      searchForm: {
        ...state.searchForm,
        name: '',
      }
    }));    
  }; 

  toAddRole = () => {
    this.setState({
      isNewPerson: true
    });
    this.openDialogForm()
  }; 

  openDialogForm = () => {
    this.setState({
      dialogFormVisible: true
    });
  };  
  handleEdit = (row) => {
    let dialogForm = loadsh.pick(row,['name','note','id']);
    this.setState((state) => ({
      isNewPerson: false,
      dialogForm: {
        ...dialogForm
      }
    }));
    this.openDialogForm();
  };
  closeDialogForm = () => {
    const { form } = this.formRef.props;
    form.resetFields();
    this.setState({
      dialogFormVisible: false      
    });
  }; 
  saveRole = () => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue
      };
      this.setState({ dialogFormLoading: true });

       if(this.state.isNewPerson) {
        let newData = await zaRoleAdd(values)
        if(newData) {        
          form.resetFields();
          this.setState({ 
            dialogFormVisible: false, 
            dialogFormLoading: false 
          });
          message.success('添加成功')
          this.handleSearch()
        }
        return        
      }

      if(!this.state.isNewPerson) {
        let newData = await zaRoleUpdate(values)
        if(newData) {        
          form.resetFields();
          this.setState({ 
            dialogFormVisible: false, 
            dialogFormLoading: false 
          });
          message.success('修改成功')
          this.handleSearch()
        }
        return        
      }
      
    });
  }; 

  render() {
    return (
      <div>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="权限管理" key="1">
            <Form layout="inline">
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="角色名称:">
                    <Input value={this.state.searchForm.name} onChange={this.filterTitleChange} />
                  </Form.Item>
                </Col>               
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col span={24} style={{ textAlign: 'center' }}>
                  <Button type="primary" onClick={this.handleSearch}>
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    重置
                  </Button>
                  <Button style={{ marginLeft: 8 }} type="primary" onClick={this.toAddRole}>
                    新增角色
                  </Button>                  
                </Col>
              </Row>
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
          scroll={{ y: 380 }}
          size="small"
        >
          <Column title="角色名称" dataIndex="name" key="name" align="center" width={100} />
          <Column title="角色描述" dataIndex="note" key="note" align="center" />
          <Column title="功能权限" dataIndex="menus" key="menus" align="center" />
          <Column title="节点权限" dataIndex="nodes" key="nodes" align="center" />
          <Column title="操作" key="action" align="center" width={200} render={(text, row) => (
            <span>
              <Button type="link" onClick={this.handleEdit.bind(null, row)}>修改角色</Button>
            </span>
          )} />
        </Table>
        <br />
        <div className="m-t-10 m-b-10 text-r">
          <Pagination
            total={this.state.total}
            pageSizeOptions={["10", "20", "30", "50"]}
            showTotal={(total) => `共${total}条数据`}
            onChange={this.changePage}
            current={this.state.searchForm.page}
            onShowSizeChange={this.changePageSize}
            showSizeChanger
            showQuickJumper
            hideOnSinglePage={true}
            size="small"
          />
        </div>
        <EditForm
          currentRowData={this.state.dialogForm}
          wrappedComponentRef={formRef => this.formRef = formRef}
          visible={this.state.dialogFormVisible}
          confirmLoading={this.state.dialogFormLoading}
          onCancel={this.closeDialogForm}
          onOk={this.saveRole}
        />        
      </div>
    );
  }
}

export default Page;
