import React, { useState } from 'react';
import CourtComponent from '../../../../../components/UserComponent/PickleBallCourt/CourtComponent/CourtComponent';
import { arrImages, dropdownItems, keySearch } from '../../HandleData/CourtPickleBall/CourtPickleBall';
import { showError } from '../../../../../components/UserComponent/CommonComponent/Message/Message';
import { useNavigate } from 'react-router-dom';
import { searchKeyWord } from '../../../../../services/users/PickleBallCourt/PickleBallCourt';


function CourtHeaderContainer() {
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState("");

  const handleSelectDistrict = (selectedItem) => {
    setKeyWord(selectedItem.label);
  };

  const handleSearch = () => {
    if(keyWord === "") {
        showError("Chọn địa điểm Quận/Huyện ")
    } else {
        navigate('/searchPage', { state: { keyword: keyWord } });
    }
  };

  return (
    <CourtComponent
      arrImages={arrImages}
      items={dropdownItems}
      keySearch={keySearch}
      onSearch={handleSearch}
      onSelectDistrict={handleSelectDistrict}
    />
  );
}

export default CourtHeaderContainer;
