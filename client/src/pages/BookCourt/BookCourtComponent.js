import React from 'react'
import HeaderComponent from '../../components/UserComponent/PickleCourt/HeaderPickleComponent/HeaderPickleComponent'
import DetailCourtComponent from '../../components/UserComponent/PickleCourt/DetailCourtComponent/DetailCourtComponent'
import FooterPickleCourt from '../../components/UserComponent/PickleCourt/FooterPickleCourt/FooterPickleCourt'
import BookCourtComponent from '../../components/UserComponent/PickleCourt/BookCourt/BookCourt'

const BookCourt = () => {
  return (
    <>
      <HeaderComponent/>
      <div style={{ marginTop: '120px', marginBottom: '40px'}}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 8px' }}>
            
          <BookCourtComponent/>

        </div>
      </div>
      <FooterPickleCourt />
    </>
  )
}

export default BookCourt