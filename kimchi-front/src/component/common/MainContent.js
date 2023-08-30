import "./MainContent.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Autoplay } from "swiper";
import { useState } from "react";
import ProductItem from "../product/ProductItem";
import ProductList from "../product/ProductList";
import {useEffect} from 'react';
import axios from "axios";

function MainContent() {
  const [swiper, setSwiper] = useState(null);

  let [productList, setProductList] = useState([]);

  useEffect(function() {

      let url = "/product/mainList";

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
