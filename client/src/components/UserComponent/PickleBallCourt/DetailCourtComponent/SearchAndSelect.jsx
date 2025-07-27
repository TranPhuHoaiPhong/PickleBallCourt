import React, { useState, useEffect } from 'react';
import { DatePicker, Button } from 'antd';
import DropdownTime from '../../PickleBallCourt/Component/DropdownHuyen/DropDownTime';
import SrollComponent from '../../PickleBallCourt/Component/ScrollComponent/SrollComponent';
import { handleTimeSelectStart, handleTimeSelectEnd, handleSearchCourt } from '../../../../pages/User/PickleBallCourt/HandlePage/DetailCourt/DetailCourt';

const SearchAndSelectCourts = ({
  onChangeDate,
  disabledDate,
  itemsStart = [],
  itemsEnd = [],
  selectedCourts,
  onRemoveCourt,
  selectedDate,
  setSelectedTimeStart,
  setSelectedTimeEnd,
  selectedTimeStart,
  selectedTimeEnd,
  idCourt,
  handleSelectedCourts
}) => {
  const [data, setData] = useState([]);

  
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '20px',
          flexWrap: 'wrap',
          marginBottom: '20px',
        }}
      >
        <DatePicker
          onChange={onChangeDate}
          disabledDate={disabledDate}
          format="DD/MM/YYYY"
          style={{
            boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.15)',
            padding: '8px',
          }}
        />
        {/* start */}
        <div style={{ marginLeft: "5px"}}></div>
        <DropdownTime
          items={itemsStart}
          onSelect={(item) => handleTimeSelectStart(item, setSelectedTimeStart)}
        />
        {/* end */}
         <DropdownTime
          items={itemsEnd}
          onSelect={(item) => handleTimeSelectEnd(item, setSelectedTimeEnd)}
        />

        <Button
          style={{
            width: '25%',
            padding: '19px',
            marginLeft: '17px',
            minWidth: '120px',
          }}
          type="primary"
          onClick={() => handleSearchCourt(selectedDate, selectedTimeStart, selectedTimeEnd, idCourt, setData)}
        >
          Tìm kiếm
        </Button>
      </div>

      <SrollComponent data={data} onCourtSelected={handleSelectedCourts}/>

    </>
  );
};

export default SearchAndSelectCourts;
