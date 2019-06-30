import * as React from 'react';
import classnames from 'classnames';
import equals from 'shallow-equals';
import omit from 'omit';
import { Table } from 'antd';
import { SearchableTablePropTypes } from './proptypes';
import { SearchableTableState, Pagination, ColumnProps, FetchParams, Res } from './types';
import Column from './Column';
import Form from './Form';
import 'antd/es/table/style/css.js'
import './index.less';

export interface SearchableTableProps {
  /** 默认的分页信息 */
  defaultPagination?: Pagination,
  /** 分页信息 */
  pagination?: Pagination | boolean,
  /** 默认的搜索信息 */
  defaultSearchFormData?: object, 
  /** 搜索信息 */
  searchFormData?: object, 
  /** 表格数据 */
  dataSource?: Array<object>, 
  /** 表头数据 */
  columns: Array<object>, 
  /** 表格容器样式类 */
  className?: string,
  /** 表格容器样式 */
  style?: object,
  /** 表格样式类 */
  tableClassName?: string,
  /** 表格样式 */
  tableStyle?: object,
  /** 分页组件 props */
  tablePaginationProps?: object, 
  /** 搜索表单渲染函数 */
  form: Function, 
  /** 表格前缀内容 */
  addonBefore: React.ReactNode, 
  /** 表格后缀内容 */
  addonAfter: React.ReactNode, 
  /** 获取远程数据 */
  fetch?: Function, 
  /** 转换请求 */
  transform?: Function, 
  /** 转换响应 */
  convert?: Function, 
  [key: string]: any,
}

const defaultPagination = {
  current: 1,
  pageSize: 10,
  total: 0
};

/**
 * 带搜索表单的表格
 */
export default class SearchableTable extends React.Component<SearchableTableProps, SearchableTableState> {
  static Column: typeof Column = Column;
  static SearchForm: typeof Form = Form;
  static propTypes = SearchableTablePropTypes;
  static defaultProps = {
    tablePaginationProps: {}
  };

  static getDerivedStateFromProps(props: SearchableTableProps, state: SearchableTableState) {
    const newState: SearchableTableState = {};
    let changed = false;

    if (typeof props.pagination === 'object' && !equals(props.pagination, state.pagination)) {
      newState.pagination = props.pagination;
      changed = true;
    };

    if (props.searchFormData && !equals(props.searchFormData, state.searchFormData)) {
      newState.searchFormData = props.searchFormData;
      changed = true;
    };

    if (props.dataSource && !equals(props.dataSource, state.dataSource)) {
      newState.dataSource = props.dataSource;
      changed = true;
    };

    if (changed) return newState;
    return null;
  };

  unmounted: boolean = false;

  constructor(props: SearchableTableProps) {
    super(props);
    this.state = {
      pagination: 'defaultPagination' in props ? props.defaultPagination :
        typeof props.pagination === 'object' ? props.pagination : defaultPagination,
      dataSource: 'defaultDataSource' in props ? props.defaultDataSource : props.dataSource,
      searchFormData: 'defaultSearchFormData' in props ? props.defaultSearchFormData : props.searchFormData,
      loading: false,
    };
  }

  componentDidMount() {
    this.reload();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  /**
   * 根据 state 状态加载远程数据
   */
  reload = async () => {
    const { searchFormData, pagination } = this.state;
    return await this.fetch({
      searchFormData,
      pagination: {
        current: pagination && pagination.current,
        pageSize: pagination && pagination.pageSize
      }
    });
  }

  /**
   * 获取远程数据
   */
  fetch = async ({ pagination: paginationParam, searchFormData, filters, sorter }: FetchParams) => {
    const { transform, fetch, convert } = this.props;
    if (!fetch) return;

    let params = {
      pagination: paginationParam,
      searchFormData,
      filters,
      sorter
    };
    params = transform ? transform(params) : params;

    this.setState({
      loading: true
    });

    const response = await fetch(params).catch(() => {
      if (this.unmounted) return;
      this.setState({
        loading: false
      });
    });
    const res: Res = convert ? convert(response) : response;

    if (this.unmounted) return;

    const { dataSource, pagination } = res;

    this.setState({
      dataSource,
      pagination: pagination,
      searchFormData,
      loading: false
    });

    return res;
  }

  /**
   * 表单搜索
   */
  handleFetchViaForm = (searchFormData = {}) => {
    const { pagination = {} } = this.state;
    const { pageSize } = pagination;
    this.setState({
      searchFormData
    }, () => {
      this.fetch({
        searchFormData,
        pagination: {
          current: 1,
          pageSize
        }
      });
    });
  }

  /**
   * 表格 change
   */
  handleFetchViaTable = (pagination: Pagination, filters: Array<object>, sorter: Array<object>) => {
    const { searchFormData } = this.state;

    this.fetch({
      searchFormData,
      pagination: {
        current: pagination && pagination.current,
        pageSize: pagination && pagination.pageSize
      },
      filters, 
      sorter, 
    });
  }

  /**
   * 渲染搜索表单。拆分，便于继承
   */
  renderForm() {
    const { form } = this.props;
    return form ? (
      <div className='searchable-table-form-wrap'>
        { form(this.handleFetchViaForm, this.state) }
      </div>
    ) : '';
  }

  /**
   * 渲染表格。拆分，便于继承
   */
  renderTable() {
    const { pagination: paginationState, dataSource, loading } = this.state;
    const { tableClassName, tableStyle, pagination: paginationProp, tablePaginationProps, 
      columns: columnsProp, children, ...rest } = this.props;
    const tableClassNames = classnames({
      'searchable-table': true,
      ...(tableClassName ? {
        [tableClassName]: !!tableClassName
      } : {})
    });
    const tableProps = omit(['className', 'style', 'defaultPagination', 'defaultSearchInfo',
      'searchInfo', 'defaultDataSource', 'dataSource', 'fetch', 'form'])(rest);
    const pagination = typeof paginationProp === 'boolean' ? paginationProp :
      { ...paginationProp, ...tablePaginationProps, ...paginationState };
    const columns = children ? React.Children.toArray(children).map((child: React.ReactElement) => {
      const props: ColumnProps = child.props;
      const { cell, ...childRest } = props;
      return {
        ...childRest,
        key: childRest.dataIndex,
        render: cell
      };
    }) : columnsProp;

    return <Table {...tableProps} loading={loading} dataSource={dataSource} columns={columns}
      pagination={pagination} onChange={this.handleFetchViaTable}
      className={tableClassNames} style={tableStyle} />;
  }

  render() {
    const { className, style, addonBefore, addonAfter } = this.props;
    const classNames = classnames({
      'searchable-table-container': true,
      ...(className ? {
        [className]: !!className
      } : {})
    });

    return (
      <div className={classNames} style={style}>
        {this.renderForm()}

        <div className='searchable-table-wrapper'>
          {addonBefore}
          {this.renderTable()}
          {addonAfter}
        </div>
      </div>
    );
  }
};