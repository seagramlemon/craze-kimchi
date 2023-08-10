import "./ProductContent.css";
import ProductItem from "./ProductItem";
import ProductList from "./ProductList";
import {useState} from 'react';
import {useEffect} from 'react';
import axios from "axios";

function ProductContent() {

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
    <div>
      <div>
        <h3 className="productTitle">KIMCHI</h3>
      </div>
      <ProductList>
        {productList.map((item) => {
          return <ProductItem product={item} />;
        })}
      </ProductList>

      <div></div>
    </div>
  );
}

export default ProductContent;
