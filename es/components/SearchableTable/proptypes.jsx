import PropTypes from 'prop-types';
export const PaginationTypes = PropTypes.shape({
    current: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
});
export const SearchableTablePropTypes = {
    defaultPagination: PaginationTypes,
    pagination: PropTypes.oneOfType([PaginationTypes, PropTypes.bool]),
    defaultSearchInfo: PropTypes.object,
    searchInfo: PropTypes.object,
    defaultDataSource: PropTypes.array,
    dataSource: PropTypes.array,
    form: PropTypes.func,
    fetch: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    tableClassName: PropTypes.string,
    tableStyle: PropTypes.object // 表格样式
};
