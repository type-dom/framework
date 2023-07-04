import { ITableField } from './table.interface';

export const tableData: Record<string, string | number | boolean>[] = [
  {
    'table1.field1': '',
    'table1.field2': '',
    'table1.field3': '',
    // telephone: '',
  },
  // {
  //   username: 'lisi',
  //   gender: 'nan',
  //   address: 'wdadidfasdf',
  //   telephone: '13338888888',
  // },
  // {
  //   username: 'wangwu',
  //   gender: 'nan',
  //   address: 'eieieiieie',
  //   telephone: '13888888888',
  // },
];

export const tableHeader: ITableField[] = [
  {
    label: '字段1-1',
    name: 'table1.field1',
  },
  {
    label: '字段1-2',
    name: 'table1.field2',
  },
  {
    label: '字段1-3',
    name: 'table1.field3',
  },
];
