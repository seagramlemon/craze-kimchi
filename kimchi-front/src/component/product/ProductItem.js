import { useState } from "react";
import "./ProductItem.css";
import { useNavigate } from "react-router-dom";

function ProductItem(props) {

  const navigate = useNavigate();
  const [product, setProduct] = useState(props.product);

  const productClick = () => {
    navigate("detail", {state : {product:product}});
  };

  return (
    <div className="productItem" onClick={productClick}>
      <div className="imgContent">
        <img src={product.thumbnailImg} />
      </div>
      <div className="textContent">
        <span className="productName">{product.productName}</span> <br />
        <span className="price">{product.price}</span>
      </div>
    </div>
  );
}

export default ProductItem;
