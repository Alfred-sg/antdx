import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from "@storybook/addon-info";
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { Form, Input, DatePicker } from 'antd';
import { SearchableTable } from 'antdx';
import 'antd/dist/antd.css';

const stories = storiesOf('SearchableTable', module)

stories.addDecorator(withInfo);
stories.addParameters({ info: { inline: true } });

const { Column, SearchForm } = SearchableTable;
const dataSource = [{
  id: 1096545345327,
  name: '荣耀P20',
  creator: '华为',
  createDate: '2018-03-21'
}];
const fetch = async params => {
  return {
    dataSource,
    pagination: {
      current: 1,
      total: 0,
      pageSize: 10
    }
  };
};

@SearchForm
class CustomSearchForm extends Component {
  // 查询数据转换
  normalize = (vals) => {
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

stories.add('with form', () => (
    <div style={{padding: '20px'}}>
      <SearchableTable defaultDataSource={[]} 
        form={handleSearch => <CustomSearchForm handleSearch={handleSearch} />} 
        fetch={fetch}
        rowKey={r => r.id}>
        <Column dataIndex='id' title='产品id' />
        <Column dataIndex='name' title='产品名' />
        <Column dataIndex='creator' title='制造商' />
        <Column dataIndex='createDate' title='生产日期' />
      </SearchableTable>
    </div>
  ));