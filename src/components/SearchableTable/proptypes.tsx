
import PropTypes from 'prop-types';

export const PaginationTypes = PropTypes.shape({
  current: PropTypes.number.isRequired, 
  pageSize: PropTypes.number.isRequired, 
  total: PropTypes.number.isRequired, 
})

export const SearchableTablePropTypes = {
  defaultPagination: PaginationTypes,// 默认分页
  pagination: PropTypes.oneOfType([PaginationTypes, PropTypes.bool]),// 分页
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
}