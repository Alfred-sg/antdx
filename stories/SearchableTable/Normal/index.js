import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from "@storybook/addon-info";
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { SearchableTable } from 'antdx';

const stories = storiesOf('SearchableTable', module)

stories.addDecorator(withInfo);
stories.addParameters({ info: { inline: true } });

const { Column } = SearchableTable;
const dataSource = [{
  id: 1096545345327,
  name: '荣耀P20',
  creator: '华为',
  createDate: '2018-03-21'
}];

stories.add('normal', () => ( 
    <div style={{padding: '20px'}}>
      <SearchableTable dataSource={dataSource} rowKey={r => r.id}>
        <Column dataIndex='id' title='产品id' />
        <Column dataIndex='name' title='产品名' />
        <Column dataIndex='creator' title='制造商' />
        <Column dataIndex='createDate' title='生产日期' />
      </SearchableTable>
    </div> 
  ));