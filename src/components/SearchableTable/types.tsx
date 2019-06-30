export type Pagination = {
  current?: number,
  pageSize?: number,
  total?: number,
}

export type SearchableTableState = {
  pagination?: Pagination,
  searchFormData?: object,
  dataSource?: Array<object>,
  loading?: boolean,
}

export type ColumnProps = {
  dataIndex: string | number,
  cell: Function, 
  [key: string]: any,
}

export type FetchParams = {
  pagination: Pagination,
  searchFormData?: object,
  filters?: Array<object>,
  sorter?: Array<object>,
}

export type Res = {
  pagination: Pagination,
  dataSource?: Array<object>,
}

export type FormUtils = {
  resetFields: Function,
  getFieldsValue: Function,
}

export type SearchFormProps = {
  doSearch: Function,
  form: FormUtils, 
  [key: string]: any,
}

export type FormContent = {
  transform?: Function,
}

export interface FormContentCompProps {
  form: FormUtils,
  ref: Function
}