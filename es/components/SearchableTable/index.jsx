var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import classnames from 'classnames';
import equals from 'shallow-equals';
import omit from 'omit';
import { Table } from 'antd';
import { SearchableTablePropTypes } from './proptypes';
import Column from './Column';
import Form from './Form';
import 'antd/es/table/style/css.js';
import './index.less';
const defaultPagination = {
    current: 1,
    pageSize: 10,
    total: 0
};
/**
 * 带搜索表单的表格
 */
export default class SearchableTable extends React.Component {
    constructor(props) {
        super(props);
        this.unmounted = false;
        /**
         * 根据 state 状态加载远程数据
         */
        this.reload = () => __awaiter(this, void 0, void 0, function* () {
            const { searchFormData, pagination } = this.state;
            return yield this.fetch({
                searchFormData,
                pagination: {
                    current: pagination && pagination.current,
                    pageSize: pagination && pagination.pageSize
                }
            });
        });
        /**
         * 获取远程数据
         */
        this.fetch = ({ pagination: paginationParam, searchFormData, filters, sorter }) => __awaiter(this, void 0, void 0, function* () {
            const { transform, fetch, convert } = this.props;
            if (!fetch)
                return;
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
            const response = yield fetch(params).catch(() => {
                if (this.unmounted)
                    return;
                this.setState({
                    loading: false
                });
            });
            const res = convert ? convert(response) : response;
            if (this.unmounted)
                return;
            const { dataSource, pagination } = res;
            this.setState({
                dataSource,
                pagination: pagination,
                searchFormData,
                loading: false
            });
            return res;
        });
        /**
         * 表单搜索
         */
        this.handleFetchViaForm = (searchFormData = {}) => {
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
        };
        /**
         * 表格 change
         */
        this.handleFetchViaTable = (pagination, filters, sorter) => {
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
        };
        this.state = {
            pagination: 'defaultPagination' in props ? props.defaultPagination :
                typeof props.pagination === 'object' ? props.pagination : defaultPagination,
            dataSource: 'defaultDataSource' in props ? props.defaultDataSource : props.dataSource,
            searchFormData: 'defaultSearchFormData' in props ? props.defaultSearchFormData : props.searchFormData,
            loading: false,
        };
    }
    static getDerivedStateFromProps(props, state) {
        const newState = {};
        let changed = false;
        if (typeof props.pagination === 'object' && !equals(props.pagination, state.pagination)) {
            newState.pagination = props.pagination;
            changed = true;
        }
        ;
        if (props.searchFormData && !equals(props.searchFormData, state.searchFormData)) {
            newState.searchFormData = props.searchFormData;
            changed = true;
        }
        ;
        if (props.dataSource && !equals(props.dataSource, state.dataSource)) {
            newState.dataSource = props.dataSource;
            changed = true;
        }
        ;
        if (changed)
            return newState;
        return null;
    }
    ;
    componentDidMount() {
        this.reload();
    }
    componentWillUnmount() {
        this.unmounted = true;
    }
    /**
     * 渲染搜索表单。拆分，便于继承
     */
    renderForm() {
        const { form } = this.props;
        return form ? (<div className='searchable-table-form-wrap'>
        {form(this.handleFetchViaForm, this.state)}
      </div>) : '';
    }
    /**
     * 渲染表格。拆分，便于继承
     */
    renderTable() {
        const { pagination: paginationState, dataSource, loading } = this.state;
        const _a = this.props, { tableClassName, tableStyle, pagination: paginationProp, tablePaginationProps, columns: columnsProp, children } = _a, rest = __rest(_a, ["tableClassName", "tableStyle", "pagination", "tablePaginationProps", "columns", "children"]);
        const tableClassNames = classnames(Object.assign({ 'searchable-table': true }, (tableClassName ? {
            [tableClassName]: !!tableClassName
        } : {})));
        const tableProps = omit(['className', 'style', 'defaultPagination', 'defaultSearchInfo',
            'searchInfo', 'defaultDataSource', 'dataSource', 'fetch', 'form'])(rest);
        const pagination = typeof paginationProp === 'boolean' ? paginationProp : Object.assign({}, paginationProp, tablePaginationProps, paginationState);
        const columns = children ? React.Children.toArray(children).map((child) => {
            const props = child.props;
            const { cell } = props, childRest = __rest(props, ["cell"]);
            return Object.assign({}, childRest, { key: childRest.dataIndex, render: cell });
        }) : columnsProp;
        return <Table {...tableProps} loading={loading} dataSource={dataSource} columns={columns} pagination={pagination} onChange={this.handleFetchViaTable} className={tableClassNames} style={tableStyle}/>;
    }
    render() {
        const { className, style, addonBefore, addonAfter } = this.props;
        const classNames = classnames(Object.assign({ 'searchable-table-container': true }, (className ? {
            [className]: !!className
        } : {})));
        return (<div className={classNames} style={style}>
        {this.renderForm()}

        <div className='searchable-table-wrapper'>
          {addonBefore}
          {this.renderTable()}
          {addonAfter}
        </div>
      </div>);
    }
}
SearchableTable.Column = Column;
SearchableTable.SearchForm = Form;
SearchableTable.propTypes = SearchableTablePropTypes;
SearchableTable.defaultProps = {
    tablePaginationProps: {}
};
;
