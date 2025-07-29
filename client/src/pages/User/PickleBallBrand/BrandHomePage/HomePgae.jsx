import React from 'react'


import slide1 from '../../../../assets/images/slide1.webp'
import slide2 from '../../../../assets/images/slide2.webp'
import slide3 from '../../../../assets/images/slide3.webp'
import slide4 from '../../../../assets/images/slide4.webp'
import slide5 from '../../../../assets/images/slide5.webp'
import slide6 from '../../../../assets/images/slide6.webp'
import slide7 from '../../../../assets/images/slide7.webp'


import i1 from '../../../../assets/introduction/i1.webp'
import i2 from '../../../../assets/introduction/i2.webp'
import i3 from '../../../../assets/introduction/i3.webp'
import i4 from '../../../../assets/introduction/i4.webp'
import SliderComponent from '../../../../components/UserComponent/PickleBallBrand/SliderComponent/SliderComponent'
import Introduction from '../../../../components/UserComponent/CommonComponent/Introduction/Introduction'
import ProductPage from '../../../../components/UserComponent/PickleBallBrand/ProductComponent/ProductComponent'
import FooterComponent from "../../../../components/UserComponent/CommonComponent/FooterComponent/FooterComponent"

const data = [
  {
    name: "VỢT PICKLEBALL",
    img: i1,
    index: 1
  },
  {
    name: "BÓNG PICKLEBALL",
    img: i2,
    index: 2
  },{
    name: "PHỤ KIỆN PICKLEBALL",
    img: i3,
    index: 3
  },{
    name: "QUẦN ÁO PICKLEBALL",
    img: i4,
    index: 4
  },
]

const products = [
  {
    "_id": "1",
    "name": "Vợt Pickleball Bền Nhẹ",
    "images": i1,
    "colors": [
      { "price": 990000 }
    ]
  },
  {
    "_id": "2",
    "name": "Bóng Pickleball Cao Cấp",
    "images": i2,
    "colors": [
      { "price": 129000 }
    ]
  },
  {
    "_id": "3",
    "name": "Giày Thể Thao Pickleball",
    "images": i3,
    "colors": [
      { "price": 1590000 }
    ]
  },
  {
    "_id": "4",
    "name": "Áo Thun Pickleball Thoáng Mát",
    "images": i4,
    "colors": [
      { "price": 450000 }
    ]
  },
  {
    "_id": "5",
    "name": "Túi Đựng Dụng Cụ Pickleball",
    "images": i1,
    "colors": [
      { "price": 650000 }
    ]
  },
  {
    "_id": "1",
    "name": "Vợt Pickleball Bền Nhẹ",
    "images": i1,
    "colors": [
      { "price": 990000 }
    ]
  },
  {
    "_id": "2",
    "name": "Bóng Pickleball Cao Cấp",
    "images": i2,
    "colors": [
      { "price": 129000 }
    ]
  },
  {
    "_id": "3",
    "name": "Giày Thể Thao Pickleball",
    "images": i3,
    "colors": [
      { "price": 1590000 }
    ]
  },
  {
    "_id": "4",
    "name": "Áo Thun Pickleball Thoáng Mát",
    "images": i4,
    "colors": [
      { "price": 450000 }
    ]
  },
  {
    "_id": "5",
    "name": "Túi Đựng Dụng Cụ Pickleball",
    "images": i1,
    "colors": [
      { "price": 650000 }
    ]
  }
]


const HomePage = () => {
  
  return (
    <>
      <div>
        <div style={{ marginTop: '80px'}}>
          <SliderComponent arrImages={[slide1, slide2, slide3, slide4, slide5, slide6, slide7]} />
        </div>
        <div>
          <Introduction data={data} />
        </div>
        <div>
          <ProductPage products={products}/>
        </div>
        <div>
          <FooterComponent/>
        </div>
      </div>
    </>
  )
}

export default HomePage