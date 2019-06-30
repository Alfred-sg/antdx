import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button, Form } from 'antd';
import { SearchFormProps, FormContent, FormContentCompProps } from './types';

/**
 * 虚拟组件，用于收集列渲染规则
 */
export default function SearchFormDecorator(FormContentComp: React.ComponentType<FormContentCompProps>){
  class SearchForm extends React.Component<SearchFormProps> {
    static propTypes = {
      handleSearch: PropTypes.func.isRequired,
      btns: PropTypes.func,
    };

    form: FormContent | undefined = undefined;

    /**
     * 搜索
     */
    handleSearch = () => {
      const { handleSearch, form } = this.props;
      let values = form.getFieldsValue();
      // 查询数据转换
      values = this.form && this.form.transform ? this.form.transform(values) : values;
      handleSearch && handleSearch(values);
    }
  
    /**
     * 重置
     */
    handleReset = () => {
      const { handleSearch, form } = this.props;
      form.resetFields();
      handleSearch && handleSearch();
    }

    handles = {
      handleSearch: this.handleSearch,
      handleReset: this.handleReset,
      originHandleSearch: this.props.handleSearch,
    }
  
    render(){
      const { form, btns } = this.props;
  
      return (
        <div className='searchable-table-form'>
          <FormContentComp form={form} ref={(c: any) => { if (c) this.form = c; }} />

          { btns ? (
            <div className='searchable-table-form-btns'>
              { btns(this.handles) }
            </div>
          ) : (
            <div className='searchable-table-form-btns'>
              <Button type='primary' className='search-btn' onClick={this.handleSearch}>搜索</Button>
              <Button type='default' className='reset-btn' onClick={this.handleReset}>重置</Button>
            </div>
          ) }
        </div>
      );
    }
  }

  return Form.create()(SearchForm);
};