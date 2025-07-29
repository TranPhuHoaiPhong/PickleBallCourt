// pages/DetailCourt.jsx
import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../../../components/UserComponent/PickleBallCourt/HeaderPickleComponent/HeaderPickleComponent';
import FooterPickleCourt from '../../../../components/UserComponent/PickleBallCourt/FooterPickleCourt/FooterPickleCourt';
import DetailCourtComponent from '../../../../components/UserComponent/PickleBallCourt/DetailCourtComponent/DetailCourtComponent';
import { useParams } from 'react-router-dom';
import { getDetailCourtLocation } from '../../../../services/users/DetailPickleBall/DetailPickleBall';


const DetailCourt = () => {
  const { id } = useParams();
  const [detailCourt, setDetailCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idCourt, setIdCourt] = useState(true);

  // Hàm fetch tách riêng để dễ kiểm thử / tái sử dụng
  const fetchDetailCourt = async (courtId) => {
    try {
      const data = await getDetailCourtLocation(courtId);
      setDetailCourt(data);
      setIdCourt(courtId)
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sân:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetailCourt(id);
    }
  }, [id]);

  return (
    <>
      <HeaderComponent />
      <div style={{ marginTop: '120px', marginBottom: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 8px' }}>
          {loading ? (
            <p>Đang tải thông tin sân...</p>
          ) : detailCourt ? (
            <DetailCourtComponent dataCourt={{detailCourt, idCourt}} />
          ) : (
            <p>Không tìm thấy thông tin sân.</p>
          )}
        </div>
      </div>
      <FooterPickleCourt />
    </>
  );
};

export default DetailCourt;