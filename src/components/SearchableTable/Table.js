import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { Table, Spin } from 'antd';
import classnames from 'classnames';
import omit from 'omit';
import warning from 'warning';

const paginationTypes = PropTypes.shape({
  current: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
});
const defaultPagination = {
  current: 1,
  pageSize: 10,
  total: 0
};

/**
 * 带搜索表单的表格
 */
export default class SearchableTable extends Component {
  static propTypes = {
    defaultPagination: paginationTypes,// 默认分页
    pagination: PropTypes.oneOfType([paginationTypes, PropTypes.bool]),// 分页
    defaultSearchInfo: PropTypes.object,// 默认搜索
    searchInfo: PropTypes.object,// 搜索
    defaultDataSource: PropTypes.array,// 默认列表数据
    dataSource: PropTypes.array,// 列表数据
    form: PropTypes.func,// 搜索表单渲染函数
    fetch: PropTypes.func,// 获取列表数据的方法
    className: PropTypes.string,// 样式类
    style: PropTypes.object,// 样式
    tableClassName: PropTypes.string,// 表格样式类
    tableStyle: PropTypes.object// 表格样式
  };
  static getDerivedStateFromProps(props, state){
    const { pagination: paginationState = {} } = state;
    const { pagination, searchInfo, dataSource } = props;
    let newState = {};

    if ( 'pagination' in props && typeof pagination === 'object' && pagination ){
      if ( pagination.current === paginationState.current && 
        pagination.pageSize === paginationState.pageSize && 
        pagination.total === paginationState.total ) 
        return;

      newState.pagination = {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total
      };
    };

    if ( 'searchInfo' in props && searchInfo !== state.searchInfo ){
      newState.searchInfo = searchInfo;
    };

    if ( 'dataSource' in props && dataSource !== state.dataSource ){
      newState.dataSource = dataSource;
    };

    if ( Object.keys(newState).length ) return newState;
    return null;
  };

  constructor(props){
    super(props);

    let state = {};

    let pagination;
    if ( 'pagination' in props && typeof props.pagination === 'object' && pagination ){
      pagination = {
        current: prop.pagination.current,
        pageSize: prop.pagination.pageSize,
        total: prop.pagination.total
      };
      state.pagination = pagination;
    } else if ( 'defaultPagination' in props ){
      pagination = props.defaultPagination;
      state.pagination = pagination;
    } else {
      state.pagination = defaultPagination;
    };

    let dataSource;
    if ( 'dataSource' in props ){
      dataSource = props.dataSource;
      state.dataSource = dataSource;
    } else if ( 'defaultDataSource' in props ){
      dataSource = props.defaultDataSource;
      state.dataSource = dataSource;
    };

    let searchInfo;
    if ( 'searchInfo' in props ){
      searchInfo = props.searchInfo;
      state.searchInfo = searchInfo;
    } else if ( 'defaultSearchInfo' in props ){
      searchInfo = props.defaultSearchInfo;
      state.searchInfo = searchInfo;
    };

    this.state = {
      ...state, 
      loading: false
    };
    this.unmounted = false;
  }
  
  componentDidMount(){
    this.reload();
  }

  componentWillUnmount(){
    this.unmounted = true;
  }

  /**
   * 根据 state 状态加载远程数据
   */
  reload = () => {
    const { searchInfo, pagination: { current, pageSize } } = this.state;
    this.fetch({ 
      searchInfo, 
      pagination: { 
        current, 
        pageSize 
      } 
    });
  }

  /**
   * 获取远程数据
   */
  fetch = async (params) => {
    const { fetch } = this.props;
    if ( !fetch ) return;

    this.setState({
      loading: true
    });
    const res = await fetch(params);
    if( !res && !this.unmounted ){
      this.setState({
        loading: false
      });
      return;
    };

    warning(res.dataSource || res.pagination, 
      'Return of fetch prop must contain attributes with dataSource and pagination!');

    const { dataSource, pagination } = res;
    const { searchInfo } = params;
    if ( !this.unmounted )
      this.setState({
        dataSource,
        pagination: pagination || defaultPagination,
        searchInfo,
        loading: false
      });
  }

  /**
   * 表单搜索
   */
  doSearch = (searchInfo = {}) => {
    const params = { 
      searchInfo
    };
    this.fetch(params);
  }

  /**
   * 表格 change
   */
  onTableChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    const { searchInfo } = this.state;
    const params = { 
      searchInfo, 
      pagination: { 
        current, 
        pageSize 
      }
    };
    this.fetch(params);
  }

  /**
   * 渲染搜索表单。拆分，便于继承
   */
  renderForm(){
    const { form } = this.props;
    return form ? <div className='searchable-table-form'>{ form(this.doSearch) }</div> : '';
  }

  /**
   * 渲染表格。拆分，便于继承
   */
  renderTable(){
    const { pagination: paginationState, dataSource } = this.state;
    const { tableClassName, tableStyle, pagination: paginationProp, columns: columnsProp, children, ...rest } = this.props;
    const tableClassNames = classnames({
      'searchable-table': true,
      [tableClassName]: !!tableClassName
    });
    const tableProps = omit(['className', 'style', 'defaultPagination', 'defaultSearchInfo', 
      'searchInfo', 'defaultDataSource', 'dataSource', 'fetch', 'form'])(rest);
    const pagination = typeof paginationProp === 'boolean' ? paginationProp : 
      { ...paginationProp, ...paginationState };
    const columns = children ? Children.map(children, child => {
      const { cell, ...rest } = child.props;
      return {
        ...rest,
        key: rest.dataIndex,
        render: cell
      }
    }) : columnsProp;

    return <Table {...tableProps} dataSource={dataSource} columns={columns} 
      pagination={pagination} onChange={this.onTableChange} 
      className={tableClassNames} style={tableStyle} />;
  }

  render(){
    const { loading } = this.state;
    const { className, style } = this.props;
    const classNames = classnames({
      'searchable-table-container': true,
      [className]: !!className
    });

    return (
      <div className={classNames} style={style}>
        <Spin spinning={loading} className='searchable-table-spin'>
          {/* 表单 */}
          { this.renderForm() }

          {/* 表格及分页 */}
          { this.renderTable() }
        </Spin>
      </div>
    );
  }
};