import "./ProductList.css";

const ProductList = (props) => {
  const list = props.children;
  console.log(list);
  return (
    <div className="productList">
      {list.map((item) => {
        return item;
      })}
    </div>
  );
};

export default ProductList;
