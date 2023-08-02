import "./ProductList.css";

const ProductList = (props) => {
  const list = props.children;
  console.log(list);
  return (
    <div className="productList">

      {/* 제품 추가용 임의 버튼 (관리자 페이지 나중에 만들면 지울것) */}
      <div>
        <button>제품 추가</button>
      </div>

      {list.map((item) => {
        return item;
      })}
    </div>
  );
};

export default ProductList;
