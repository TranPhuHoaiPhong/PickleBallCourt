import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const SearchComponent = ({onClick}) => {
  return (
    <div>
        <Button type="primary" 
          style={{
            height: "38px"
          }}
          onClick={onClick}
        >
            Tìm Kiếm Ngay
        </Button>
    </div>
  )
}

export default SearchComponent