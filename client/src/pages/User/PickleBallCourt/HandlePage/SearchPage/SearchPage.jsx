import React from "react";
import SearchPagecomponent from "../../../../../components/UserComponent/PickleBallCourt/SearchPage/SearchPage";

const SearchPageWrapper = ({data}) => {
    return (
        <div style={{ marginTop: '120px', marginBottom: '110px'}}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 8px' }}>
            <SearchPagecomponent mockProducts={data}/>
            </div>
        </div>
    )
}

export default SearchPageWrapper;