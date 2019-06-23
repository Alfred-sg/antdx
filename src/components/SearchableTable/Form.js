import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'antd';

/**
 * 虚拟组件，用于收集列渲染规则
 */
export default function SearchFormDecorator(FormContent){
  class SearchForm extends Component {
    static propTypes = {
      doSearch: PropTypes.func.isRequired
    };

    /**
     * 搜索
     */
    doSearch = () => {
      const { doSearch, form } = this.props;
      let values = form.getFieldsValue();
      // 查询数据转换
      values = this.form && this.form.transform ? this.form.transform(values) : values;
      doSearch && doSearch(values);
    }
  
    /**
     * 重置
     */
    doReset = () => {
      const { doSearch, form } = this.props;
      form.resetFields();
      doSearch && doSearch();
    }
  
    render(){
      const { form } = this.props;
  
      return (
        <div className='searchable-table-form-content'>
          <FormContent form={form} ref={c => { if (c) this.form = c; }} />

          <div className='searchable-table-form-btns'>
            <Button type='primary' className='search-btn' onClick={this.doSearch}>搜索</Button>
            <Button type='default' className='reset-btn' onClick={this.doReset}>重置</Button>
          </div>
        </div>
      );
    }
  }

  return Form.create()(SearchForm);
};