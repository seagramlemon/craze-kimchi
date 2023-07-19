import "./MainContent.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Autoplay } from "swiper";
import { useState } from "react";
import ProductItem from "../product/ProductItem";
import ProductList from "../product/ProductList";

function MainContent() {
  const [swiper, setSwiper] = useState(null);
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
  ];
  console.log(productList);
  SwiperCore.use([Autoplay]);

  const swiperParams = {
    navigation: false,
    onSwiper: setSwiper,
    autoplay: { delay: 3000, disableOnInteraction: false },
    loop: true,
  };

  return (
    <div id="content">
      <div id="content_1">
        <div className="swiper">
          <Swiper {...swiperParams} ref={setSwiper}>
            <SwiperSlide>
              <img src="https://thekimchi.co.kr/images/2017site/main/b_1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://thekimchi.co.kr/images/2017site/main/b_2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://thekimchi.co.kr/images/2017site/main/b_3.jpg" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div id="content_2">
        <div className="title">
          <span>일일 특가</span>
        </div>

        <ProductList>
          {productList.map((item) => {
            return <ProductItem product={item} />;
          })}
        </ProductList>
      </div>
      <div id="content_3">
        <div className="title">
          <span>THE KIMCHI's PICK</span>
        </div>
        <ProductList>
          {productList.map((item) => {
            return <ProductItem product={item} />;
          })}
        </ProductList>
      </div>
    </div>
  );
}

export default MainContent;
