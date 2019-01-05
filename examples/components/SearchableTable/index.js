import React, { Component } from 'react';
import { Table } from 'antd';
import Demo from '../Demo';
import WithForm from './WithForm';
import WithFormHtml from 'raw-loader!./WithForm/index.raw';
import CustomForm from './CustomForm';
import Normal from './Normal';
import NormalHtml from 'raw-loader!./Normal/index.raw';
import NoPagination from './NoPagination';
import NoPaginationHtml from 'raw-loader!./NoPagination/index.raw';

const columns = [{
  key: 'option',
  dataIndex: 'option',
  title: '选项'
}, {
  key: 'description',
  dataIndex: 'description',
  title: '说明'
}, {
  key: 'type',
  dataIndex: 'type',
  title: '类型'
}, {
  key: 'default',
  dataIndex: 'default',
  title: '默认值'
}];

const dataSource = [{
  option: 'defaultPagination',
  description: '默认的分页数据，构成非受控组件',
  type: 'Object',
  default: '-'
}, {
  option: 'pagination',
  description: '分页数据，构成受控组件',
  type: 'Object',
  default: '-'
}, {
  option: 'defaultSearchInfo',
  description: '默认的查询数据，构成受控组件',
  type: 'Object',
  default: '-'
}, {
  option: 'searchInfo',
  description: '查询数据，构成受控组件',
  type: 'Object',
  default: '-'
}, {
  option: 'defaultDataSource',
  description: '查询数据，构成受控组件',
  type: 'Array',
  default: '-'
}, {
  option: 'dataSource',
  description: '查询数据，构成受控组件',
  type: 'Array',
  default: '-'
}, {
  option: 'form',
  description: '表单渲染函数，doSearch 为 SearchableTable 输出的远程调用接口',
  type: 'Function(doSearch)',
  default: '-'
}, {
  option: 'fetch',
  description: '查询远程数据的方法，构成受控组件',
  type: '({ searchInfo, pagination }) => { dataSource, pagination }',
  default: '-'
}, {
  option: 'className',
  description: '作为 SearchableTable 整体的样式类',
  type: 'String',
  default: '-'
}, {
  option: 'style',
  description: '作为 SearchableTable 整体的样式',
  type: 'Object',
  default: '-'
}, {
  option: 'tableClassName',
  description: '作为 SearchableTable 内表格的样式类',
  type: 'String',
  default: '-'
}, {
  option: 'tableStyle',
  description: '作为 SearchableTable 内表格的样式',
  type: 'Object',
  default: '-'
}];

export default class TableDemos extends Component {
  render(){
    return (
      <section>
        <section style={{marginBottom: '40px'}}>
          <h2>API</h2>

          <h2>SearchableTable</h2>
          <Table columns={columns} dataSource={dataSource} pagination={false} 
            rowKey={r => r.option}/>

          <h2 style={{marginTop: '20px'}}>SearchForm</h2>
          <p>装饰 form 组件，实现 normalize 方法可用于转换查询数据。</p>
        </section>

        <section>
          <h2>代码演示</h2>

          <Demo title='带默认搜索表单' description='使用默认表单构建的可搜索表格' code={WithFormHtml}>
            <WithForm />
          </Demo>

          <Demo title='自定义搜索表单' description='使用自定义表单构建的可搜索表格' code={WithFormHtml}>
            <CustomForm />
          </Demo>

          <Demo title='默认表格' description='不含搜索功能的默认表格' code={NormalHtml}>
            <Normal />
          </Demo>

          <Demo title='没有分页' description='没有分页的表格' code={NoPaginationHtml}>
            <NoPagination />
          </Demo>
        </section>
      </section>
    )
  }
}