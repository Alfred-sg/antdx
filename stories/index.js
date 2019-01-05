// stories/index.js
import React from 'react';
import { storiesOf } from '@storybook/react';
import Src from '../src';// 来自于工程目录

console.log(Src)

storiesOf('SearchableTable', module)
  .add('with text', () => (
    <Src.SearchableTable dataSource={[{}]}></Src.SearchableTable>
  ));