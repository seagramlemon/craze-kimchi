import "./ProductList.css";

const ProductList = (props) => {

  const list = props.children;

  return (
    <div className="productList">
      {list.map((item) => {
        return item;
      })}
    </div>
  );
};

export default ProductList;
