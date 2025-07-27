import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../../../components/UserComponent/PickleBallCourt/HeaderPickleComponent/HeaderPickleComponent';
import FooterPickleCourt from '../../../../components/UserComponent/PickleBallCourt/FooterPickleCourt/FooterPickleCourt';
import SearchPageWrapper from '../../../../pages/User/PickleBallCourt/HandlePage/SearchPage/SearchPage'
import { useQuery } from '@tanstack/react-query'
import { getAllCourts} from '../../../../services/users/SearchPage/SearchPage';
import { useLocation } from 'react-router-dom';
import { searchKeyWord } from '../../../../services/users/PickleBallCourt/PickleBallCourt';
import { searchAvalable } from '../../../../services/users/SearchAvalable/SearchAvalable';

const SearchPage = () => {
  const location = useLocation();
  const keyword = location.state?.keyword || '';
  const initialCourts = location.state?.courts || [];

  const [courts, setCourts] = useState(initialCourts);
  const [isLoading, setIsLoading] = useState(!initialCourts.length);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!initialCourts.length && keyword) {
      searchKeyWord(keyword)
        .then((data) => {
          setCourts(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [keyword]);

  return (
    <>
      <HeaderComponent />
      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: 100 }}>Đang tải dữ liệu sân...</div>
      ) : isError ? (
        <div style={{ textAlign: 'center', marginTop: 100, color: 'red' }}>
          Không thể tải dữ liệu sân.
        </div>
      ) : (
        <SearchPageWrapper data={courts} />
      )}
      <FooterPickleCourt />
    </>
  );
};

export default SearchPage;
