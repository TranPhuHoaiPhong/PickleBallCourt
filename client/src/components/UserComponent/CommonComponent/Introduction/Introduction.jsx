import React from 'react'
import { WrapperButton, WrapperCol, WrapperDiv, WrapperImg, WrapperRow, WrapperSecondDiv } from './styled'
import { Link } from 'react-router-dom'


const Introduction = ({data = []}) => {

  return (
    <>
      <WrapperDiv>
          <WrapperSecondDiv>

            <WrapperRow>
                {data.map((item) => (
                  <WrapperCol xs={24} sm={12} md={12} lg={12} xl={12}>
                  <WrapperImg src={item.img}/>
                  <Link to="/product">

                    <WrapperButton 
                    type="primary"
                    onClick={() => {
                      console.log("click");
                    }}
                    >
                      {item.name}
                    </WrapperButton>

                  </Link>
                  
                </WrapperCol>
                ))}
            </WrapperRow>
            
            {/* <div>
                <SlideImagesIntroduction />
            </div> */}

          </WrapperSecondDiv>
      </WrapperDiv>
    </>
    
  )
}

export default Introduction
