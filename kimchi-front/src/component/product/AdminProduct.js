import {useNavigate} from "react-router-dom";
import "./AdminProduct.css";
import { useState } from "react";
import ProductItem from "../product/ProductItem";
import ProductList from "../product/ProductList";
import {useEffect} from 'react';
import axios from "axios";

const AdminProduct = () => {

  let navigate = useNavigate(); 

  const insertProduct = () => {
    navigate("/insert.pr");
  };

  let [productList, setProductList] = useState([]);

  useEffect(function() {

      let url = "/product/list";

      axios({
          url : url,
          method : "get"
      }).then(function(response) {
          setProductList(response.data);
      })
      .catch(function() {
          console.log("상품 리스트 조회용 ajax 통신 실패!");
      });

  }, []);

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
            return <ProductItem product={item} />;
          })}
      </ProductList>
    </div>
  );
};

export default AdminProduct;
