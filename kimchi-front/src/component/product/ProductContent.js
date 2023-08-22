import "./ProductContent.css";
import ProductItem from "./ProductItem";
import ProductList from "./ProductList";
import {useState} from 'react';
import {useEffect} from 'react';
import axios from "axios";
import PagingBar from "../common/PagingBar";

function ProductContent() {

  let [productList, setProductList] = useState([]);
  let [pageList, setPageList] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  // const changePage = (e) => {

  //   // console.log(e.target.innerText);
  //   let page = e.currentTarget.innerText;
  //   console.log("changePage",page);
  //   setCurrentPage(page);
  // };

  useEffect(function() {
      let url = "/product/list?currentPage=" + currentPage;
      console.log(currentPage);
      axios({
          url : url,
          method : "get"
      }).then(function(response) {
          //setProductList(response.data.list);
          console.log("axios",productList);
          let paging = [];
          for(let i = response.data.pi.startPage; i <= response.data.pi.endPage; i++ ) {
            paging.push(i);
          }
          setPageList(paging);
          console.log(22222);
      })
      .catch(function() {
          console.log("상품 리스트 조회용 ajax 통신 실패!");
      });
  }, [currentPage]);
  
  return (
    <div>
      <div>
        <h3 className="productTitle">KIMCHI</h3>
      </div>
      <ProductList>
        {productList.map((item) => {
          console.log(item);
          return <ProductItem product={item} />;
        })}
      </ProductList>

      <div>
        <PagingBar pageList={pageList} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default ProductContent;
