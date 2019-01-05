import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker, Button } from 'antd';

export default 
@Form.create()
class CustomSearchForm extends Component {
  static propTypes = {
    doSearch: PropTypes.func.isRequired
  };

  // 查询
  doSearch = () => {
    const { doSearch, form } = this.props;
    let values = form.getFieldsValue();
    values.createDate = values.createDate && values.createDate.valueOf();
    doSearch && doSearch(values);
  }

  // 重置
  doReset = () => {
    const { doSearch, form } = this.props;
    form.resetFields();
    doSearch && doSearch();
  }

  render(){
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className='searchable-table-form-content'>
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

        <div className='searchable-table-form-btns'>
          <Button type='primary' className='search-btn' onClick={this.doSearch}>搜索</Button>
          <Button type='default' className='reset-btn' onClick={this.doReset}>重置</Button>
        </div>
      </div>
    )
  }
}