import React from 'react'
import HeaderComponent from '../../components/UserComponent/PickleCourt/HeaderPickleComponent/HeaderPickleComponent'
import FooterPickleCourt from '../../components/UserComponent/PickleCourt/FooterPickleCourt/FooterPickleCourt'
import DetailCourtComponent from '../../components/UserComponent/PickleCourt/DetailCourtComponent/DetailCourtComponent'

const DetailCourt = () => {
  return (
    <>
      <HeaderComponent />
      <div style={{ marginTop: '120px', marginBottom: '40px'}}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 8px' }}>
            
            <DetailCourtComponent/>

        </div>
      </div>
      <FooterPickleCourt />
    </>
  )
}

export default DetailCourt