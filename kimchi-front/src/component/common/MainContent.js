import './MainContent.css';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, {Autoplay} from "swiper";
import {useState} from 'react';
import ProductItem from '../product/ProductItem';

function MainContent() {

    const [swiper, setSwiper] = useState(null);

    SwiperCore.use([Autoplay]);

    const swiperParams = {
        navigation : false,
        onSwiper : setSwiper,
        autoplay : { delay : 3000, disableOnInteraction : false },
        loop : true
    };
    
    return (
    <div id="content">
        <div id="content_1">
            <div className="swiper">
                <Swiper {...swiperParams} ref={setSwiper}>
                    <SwiperSlide><img src="https://thekimchi.co.kr/images/2017site/main/b_1.jpg" /></SwiperSlide>
                    <SwiperSlide><img src="https://thekimchi.co.kr/images/2017site/main/b_2.jpg" /></SwiperSlide>
                    <SwiperSlide><img src="https://thekimchi.co.kr/images/2017site/main/b_3.jpg" /></SwiperSlide>
                </Swiper>
            </div>
        </div>
        <div id="content_2">
            <div className="title">
                <span>일일 특가</span> 
            </div>
            <div className="list">
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </div>
        <div id="content_3">
            <div className="title">
                <span>THE KIMCHI's PICK</span> 
            </div>
            <div className="list">
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </div>
    </div>
    );
}

export default MainContent;