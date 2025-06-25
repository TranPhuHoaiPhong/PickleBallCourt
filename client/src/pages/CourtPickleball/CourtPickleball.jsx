import React from 'react'
import CourtComponent from '../../components/UserComponent/PickleCourt/CourtComponent/CourtComponent'
import HeaderComponent from '../../components/UserComponent/PickleCourt/HeaderPickleComponent/HeaderPickleComponent'

import slide1 from '../../assets/images/slide1.webp'
import slide2 from '../../assets/images/slide2.webp'
import slide3 from '../../assets/images/slide3.webp'
import slide4 from '../../assets/images/slide4.webp'
import slide5 from '../../assets/images/slide5.webp'
import slide6 from '../../assets/images/slide6.webp'
import slide7 from '../../assets/images/slide7.webp'
import Introduction from '../../components/UserComponent/PickleCourt/Introduction/Introduction'
import FooterPickleCourt from '../../components/UserComponent/PickleCourt/FooterPickleCourt/FooterPickleCourt'

function CourtPickle() {
  return (
    <>
    <HeaderComponent/>
    <div style={{ marginTop: '80px'}}>
      <CourtComponent arrImages={[slide1, slide2, slide3, slide4, slide5, slide6, slide7]}/>
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px 10px" }}>
        <Introduction/>
      </div>
    </div>
    <FooterPickleCourt/>
    </>
    
  )
}

export default CourtPickle