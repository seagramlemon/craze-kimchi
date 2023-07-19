import "./ProductContent.css";
import ProductItem from "./ProductItem";
import ProductList from "./ProductList";

function ProductContent() {
  const productList = [
    {
      img: "https://thekimchi.co.kr/web/product/medium/201708/1298_shop1_192255.jpg",
      productName: "파김치 2kg",
      price: "30,000원",
    },
    {
      img: "https://thekimchi.co.kr/web/product/medium/201708/1298_shop1_192255.jpg",
      productName: "파김치 2kg",
      price: "30,000원",
    },
    {
      img: "https://thekimchi.co.kr/web/product/medium/201708/1298_shop1_192255.jpg",
      productName: "파김치 2kg",
      price: "30,000원",
    },
    {
      img: "https://thekimchi.co.kr/web/product/medium/201708/1298_shop1_192255.jpg",
      productName: "파김치 2kg",
      price: "30,000원",
    },
    {
      img: "https://thekimchi.co.kr/web/product/medium/201708/1298_shop1_192255.jpg",
      productName: "파김치 2kg",
      price: "30,000원",
    },
    {
      img: "https://thekimchi.co.kr/web/product/medium/201708/1298_shop1_192255.jpg",
      productName: "파김치 2kg",
      price: "30,000원",
    },
  ];
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
