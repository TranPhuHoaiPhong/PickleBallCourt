import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
const columns = [
  {
    title: 'Sân',
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Giá',
    dataIndex: 'price',
  },
];
const data = [
  {
    key: '1',
    name: '1',
    price: '90000',
  },
  {
    key: '2',
    name: '2',
    price: '80000'
  },
  {
    key: '3',
    name: '3',
    price: '70000',
  },
  {
    key: '4',
    name: '4',
    price: '60000',
  },
];
// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

const SrollComponent = () => {
  const [selectionType, setSelectionType] = useState('checkbox');
  
  return (
    <>
      <div>
        <Table
          rowSelection={Object.assign({ type: selectionType }, rowSelection)}
          columns={columns}
          dataSource={data}
          scroll={{ y: 180}}
          pagination={false}
        />
      </div>
    </>
  )
}

export default SrollComponent