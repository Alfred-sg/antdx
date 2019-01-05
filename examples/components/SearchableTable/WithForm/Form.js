import React, { Component } from 'react';
import { Form, Input, DatePicker } from 'antd';
import { SearchableTable } from 'antdx';

const { SearchForm } = SearchableTable;

export default 
@SearchForm
class CustomSearchForm extends Component {
  // 查询数据转换
  normalize = (vals) => {
    console.log(vals);
    const { createDate, ...values } = vals;
    return {
      createDate: createDate && createDate.valueOf(),
      ...values
    };
  }

  render(){
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form layout="inline">
        <Form.Item label='产品id'>
          {
            getFieldDecorator('id')(
              <Input placeholder='请输入产品id' />
            )
          }
        </Form.Item>
        <Form.Item label='产品名'>
          {
            getFieldDecorator('name')(
              <Input placeholder='请输入产品名' />
            )
          }
        </Form.Item>
        <Form.Item label='制造商'>
          {
            getFieldDecorator('creator')(
              <Input placeholder='请输入制造商' />
            )
          }
        </Form.Item>
        <Form.Item label='生产日期'>
          {
            getFieldDecorator('createDate')(
              <DatePicker placeholder='请输入生产日期' format='YYYY-MM-DD HH:mm' />
            )
          }
        </Form.Item>
      </Form>
    )
  }
}