import { useState } from "react";
import "./PagingItem.css";

function PagingItem(props) {
    
    const pageNo = props.pageNo;
    const currentPage = props.currentPage;
    const setCurrentPage = props.setCurrentPage;
    const changePage = (e) =>{
        console.log(11111111);
        setCurrentPage(pageNo);
    }
    if(currentPage) {
        return (<span className="pageNo currentPage" onClick={changePage}>{pageNo}</span>);
    } else {
        return (<span className="pageNo" onClick={changePage}>{pageNo}</span>);
    }
}

export default PagingItem;