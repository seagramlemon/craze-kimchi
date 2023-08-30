import {useNavigate} from "react-router-dom";
import "./AdminProduct.css";
import { useState } from "react";
import ProductItem from "../product/ProductItem";
import ProductList from "../product/ProductList";
import {useEffect} from 'react';
import axios from "axios";
import PagingBar from "../common/PagingBar";

const AdminProduct = () => {

  let [productList, setProductList] = useState([]);
  let [pageList, setPageList] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);

  let navigate = useNavigate(); 

  const insertProduct = () => {
    navigate("/insert.pr");
  };

  useEffect(function() {
    let url = "/product/list?currentPage=" + currentPage;
    console.log(currentPage);
    axios({
        url : url,
        method : "get"
    }).then(function(response) {
        setProductList(response.data.list);
        console.log("axios",productList);
        let paging = [];
        for(let i = response.data.pi.startPage; i <= response.data.pi.endPage; i++ ) {
          paging.push(i);
        }
        setPageList(paging);
    })
    .catch(function() {
        console.log("상품 리스트 조회용 ajax 통신 실패!");
    });

  }, [currentPage]);

  return (
    <div className="adminProduct">
      <div className="title">
          <span>상품 전체 목록</span>
      </div>
      <div className="btn-area">
        <button className="btn" onClick={insertProduct}>제품 추가</button>
      </div>
      <ProductList>
          {productList.map((item) => {
            return <ProductItem key={"product" + item.productNo} product={item} />;
          })}
      </ProductList>

      <div>
        <PagingBar pageList={pageList} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default AdminProduct;
