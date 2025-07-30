import React, { useState, useEffect  } from 'react';
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


const SrollComponent = ({data = [], onCourtSelected }) => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [tableData, setTableData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    if(Array.isArray(data)) {
    const mapped = data.map(item => ({
      key: item._id,
      name: item.name,
      price: item.priceHour,
    }));
    setTableData(mapped);
    setSelectedRowKeys([])
    }
  }, [data])

  const rowSelection = {
    selectedRowKeys,
    onChange: (newselectedRowKeys, selectedRows) => {
      setSelectedRowKeys(newselectedRowKeys)
      if(onCourtSelected ) {
        onCourtSelected(selectedRows)
      }
    },
  };
  
  return (
    <>
      <div>
        <Table
          rowSelection={{ type: selectionType, ...rowSelection }}
          columns={columns}
          dataSource={tableData}
          scroll={{ y: 180 }}
          pagination={false}
        />
      </div>
    </>
  )
}

export default SrollComponent