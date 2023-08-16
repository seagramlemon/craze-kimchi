import { useState } from "react";
import "./ProductItem.css";
function ProductItem(props) {
  const [product, setProduct] = useState(props.product);
  return (
    <div className="productItem">
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
