import React, { Component } from "react";
import { Form, Input, Modal } from "antd";
const { TextArea } = Input;

class EditForm extends Component {
  render() {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading,
      currentRowData,
    } = this.props;
    const { getFieldDecorator } = form;
    const { id, note, name} = currentRowData;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="角色修改"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="角色id:" className="display-n">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input />)}
          </Form.Item>          
          <Form.Item label="角色名称:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入角色名称" }],
              initialValue: name,
            })(<Input placeholder="请输入角色名称" disabled />)}
          </Form.Item>
          <Form.Item label="角色描述:">
            {getFieldDecorator("note", {
              initialValue: note,
            })(<TextArea 
             type="textarea" 
             autoSize={{ minRows: 3, maxRows: 5 }}
             />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditForm" })(EditForm);
