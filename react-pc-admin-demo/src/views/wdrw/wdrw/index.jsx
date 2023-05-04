import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Table,
  Form,
  Button,
  Select,
  Input,
  Collapse,
  Pagination,
  Col,
  Row,
  Divider,
  DatePicker
} from "antd";
import { connect } from "react-redux";
import { addTag } from "@/store/actions";
import {
  mytasksSearch,
  flowGet,
  flowNodes,
  customerCreditInfoDownload,
} from '@/api/wdrw/wdrw';
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

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
      cname: '',
      ftCode: 'LOAN_APPLY_FLOW',
      flowNode: '',
      createDateTimeStart: '',
      createDateTimeOver: '',
      isProcessed: false,
    },
    ftCodeOptions: [],
    flowNodeOptions: [],
    activeTabName: 'todo'    
  };
  componentDidMount() {
    this._isMounted = true;
    this.getFtCodeOptions();
    this.handleSearch();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  cnameChange = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      searchForm: {
        ...state.searchForm,
        cname: value,
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
        }
      }),
      () => {
        this.handleSearch();
      }
    );
  };

  handleSearch = () => {
    this.setState({ loading: true });
    mytasksSearch(this.state.searchForm).then((res) => {
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
        cname: '',
      }
    }));
  };
  exportData = () => {
    let data = '?customerName=老大哥';
    let exportUrl = customerCreditInfoDownload() + data;
    window.location.href = exportUrl;
  };
  isSecondHandCarFilter = (value) => {
    let arr = ['', '是', '否']
    return arr[value] || '--'
  };

  handleEdit = (row) => {
    this.handleMenuSelect({
      title: row.currentNodeName,
      path:  '/wdrw/flow'
    });
    this.props.history.push(
      {
        pathname: '/wdrw/flow',
        query:{
          projectId: row.businessId,
          bopInfoId: row.businessObjectProcessInfoId,
          currentNodeName: row.currentNodeName
        }
      }
    );
  };
  handleEdit2 = (row) => {
    this.handleMenuSelect({
      title: '多媒体资料',
      path:  '/wdrw/imgInfo'
    });    
    this.props.history.push(
      {
        pathname: '/wdrw/imgInfo',
        search: `projectId=${row.businessId}&currentNodeName多媒体资料&space=LOAN&releventFlow=${row.businessTypeCode}&releventFlowNode=${row.currentNodeKey}`
      }
    );      
  };
  handleEdit3 = (row) => {
    this.handleMenuSelect({
      title: '查看贷款详情',
      path:  '/wdrw/info'
    });
    this.props.history.push(
      {
        pathname: '/wdrw/info',
        query:{
          projectId: row.businessId
        }
      }
    );
  };

  getFtCodeOptions = async () => {
    let apiData = await flowGet();
    this.setState({
      ftCodeOptions: apiData.data
    });
  }; 

  ftCodeChange = (value) => {
    this.setState(
      (state) => ({
        searchForm: {
          ...state.searchForm,
          ftCode: value,
        },
        flowNodeOptions: []
      }),
      async () => {
        let data = {
          businessTypeCode: value,
        }
        let apiData = await flowNodes(data)
        this.setState({
          flowNodeOptions: apiData.data
        });
      }      
    );
  };
  flowNodeChange = (value) => {
    this.setState(
      (state) => ({
        searchForm: {
          ...state.searchForm,
          flowNode: value,
        }
      })     
    );
  }; 
  createDateTimeStartChange = (time,value) => {
    this.setState(
      (state) => ({
        searchForm: {
          ...state.searchForm,
          createDateTimeStart: value,
        }
      })     
    );
  };
  createDateTimeOverChange = (time,value) => {
    this.setState(
      (state) => ({
        searchForm: {
          ...state.searchForm,
          createDateTimeOver: value,
        }
      })     
    );
  }; 
  
  handleMenuSelect = (menuItem) => {
    this.props.addTag(menuItem);
  };

  render() {
    return (
      <div>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="我的任务" key="1">
            <Form layout="inline">
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="客户名称:">
                    <Input style={{ width: 195 }} value={this.state.searchForm.cname} onChange={this.cnameChange} />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="流程名称:">
                    <Select
                      style={{ width: 195 }}
                      value={this.state.searchForm.ftCode}
                      onChange={this.ftCodeChange}>
                      {
                        this.state.ftCodeOptions.map((item) => {
                          return (
                            <Select.Option value={item.flowType} key={item.flowType}>{item.flowName}</Select.Option>
                          )
                        })
                      }
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="流程节点:">
                    <Select
                      placeholder="请选择"
                      style={{ width: 195 }}
                      value={this.state.searchForm.flowNode}
                      onChange={this.flowNodeChange}>
                      {
                        this.state.flowNodeOptions.map((item) => {
                          return (
                            <Select.Option value={item.nodeCode} key={item.nodeCode} >{item.nodeName}</Select.Option>
                          )
                        })
                      }
                    </Select>
                  </Form.Item>
                </Col>                
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="开始时间:">
                    <DatePicker showTime format="YYYY-MM-DD" defaultValue={ moment('2015-06-06', 'YYYY-MM-DD')} onChange={this.createDateTimeStartChange} />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="结束时间:">
                    <DatePicker showTime format="YYYY-MM-DD" onChange={this.createDateTimeOverChange} />
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
                  <Button style={{ marginLeft: 8 }} type="primary" onClick={this.exportData}>
                    导出
                  </Button>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>
        <br />

        <Table
          bordered
          rowKey={(record) => record.businessId}
          dataSource={this.state.list}
          loading={this.state.loading}
          pagination={false}
          scroll={{ y: 380 }}
          size="small"
        >
          <Column title="流程名称" dataIndex="businessTypeName" key="businessTypeName" align="center" width={100} />
          <Column title="流程节点" dataIndex="currentNodeName" key="currentNodeName" align="center" />
          <Column title="业务编号" dataIndex="businessNum" key="businessNum" align="center" />
          <Column title="客户名称" dataIndex="customerName" key="customerName" align="center" />
          <Column title="二手车业务" dataIndex="isSecondHandCar" key="isSecondHandCar" align="center" render={(isSecondHandCar) => {
            return this.isSecondHandCarFilter(isSecondHandCar)
          }} />
          <Column title="操作" key="action" align="center" width={240} render={(text, row) => {
            let isOK = row.businessTypeCode === 'LOAN_APPLY_FLOW';

            if(!isOK) {
              return (
                <span>
                  <Button type="link" onClick={this.handleEdit.bind(null, row)}>{row.currentNodeName}</Button>
                </span>
              )              
            }

            return (
              <span>
                <Button type="link" onClick={this.handleEdit.bind(null, row)}>{row.currentNodeName}</Button>
                <Divider type="vertical" />
                <Button type="link" onClick={this.handleEdit2.bind(null, row)}>多媒体资料</Button>
              </span>
            )
          }} />
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
      </div>
    );
  }
}
export default connect((state) => state.user, { addTag })(withRouter(Page));
