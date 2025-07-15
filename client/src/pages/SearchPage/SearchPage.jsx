import React, { useState } from 'react';
import HeaderComponent from '../../components/UserComponent/PickleCourt/HeaderPickleComponent/HeaderPickleComponent';
import FooterPickleCourt from '../../components/UserComponent/PickleCourt/FooterPickleCourt/FooterPickleCourt';
import SearchPagecomponent from '../../components/UserComponent/PickleCourt/SearchPage/SearchPage';

import i2 from "../../assets/introduction/intro/image-product-court.jpg";

const SearchPage = () => {
  const mockProducts = [
  { 
    id: 1,
    title: 'Sân Pickleball 1', 
    openTime: '05:30',
    closeTime: '22:00',
    addressDistrict: "Huyện Ninh Kiều",
    priceHour: 120000,
    img: i2
  },
  { 
    id: 2,
    title: 'Sân Pickleball 2', 
    openTime: '05:30',
    closeTime: '22:00',
    addressDistrict: "Huyện Ninh Kiều",
    priceHour: 120000,
    img: i2
  },
  { 
    id: 3,
    title: 'Sân Pickleball 3', 
    openTime: '05:30',
    closeTime: '22:00',
    addressDistrict: "Huyện Ninh Kiều",
    priceHour: 120000,
    img: i2
  },
  { 
    id: 4,
    title: 'Sân Pickleball 4', 
    openTime: '05:30',
    closeTime: '22:00',
    addressDistrict: "Huyện Ninh Kiều",
    priceHour: 120000,
    img: i2
  }
];

  

  return (
    <>
      <HeaderComponent />


      <div style={{ marginTop: '120px', marginBottom: '40px'}}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 8px' }}>
          <SearchPagecomponent mockProducts={mockProducts}/>
            
        </div>
      </div>
      <FooterPickleCourt />
    </>
  );
};

export default SearchPage;
