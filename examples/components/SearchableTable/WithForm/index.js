import React, { Component } from 'react';
import { SearchableTable } from 'antdx';
import Form from './Form';

const { Column } = SearchableTable;
const dataSource = [{
  id: 1096545345327,
  name: '荣耀P20',
  creator: '华为',
  createDate: '2018-03-21'
}];

export default class Table extends Component {
  // ajax 查询远程数据
  fetch = async params => {
    console.log('params is', params);
    // await doAjax();
    return {
      dataSource,
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10
      }
    };
  }

  render(){
    return (
      <SearchableTable defaultDataSource={[]} 
        form={doSearch => <Form doSearch={doSearch} />} 
        fetch={this.fetch}
        rowKey={r => r.id}>
        <Column dataIndex='id' title='产品id' />
        <Column dataIndex='name' title='产品名' />
        <Column dataIndex='creator' title='制造商' />
        <Column dataIndex='createDate' title='生产日期' />
      </SearchableTable>
    )
  }
}