import './Content.css';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, {Autoplay} from "swiper";
import {useState} from 'react';

function Content() {

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
                <div>
                    <div className="imgContent">
                        <img src="https://thekimchi.co.kr/web/product/medium/201708/1282_shop1_781211.jpg" />
                    </div>
                    <div className="textContent">
                        <span className="productName">포기김치 3kg</span> <br />
                        <span className="price">23,000원</span>
                    </div>
                </div>
                <div>                    
                    <div className="imgContent">
                        <img src="https://thekimchi.co.kr/web/product/medium/201708/1298_shop1_192255.jpg" />
                    </div>
                    <div className="textContent">
                        <span className="productName">파김치 2kg</span> <br />
                        <span className="price">30,000원</span>
                    </div>
                </div>
                <div>
                    <div className="imgContent">
                        <img src="https://thekimchi.co.kr/web/product/medium/201708/1299_shop1_217012.jpg" />
                    </div>
                    <div className="textContent">
                        <span className="productName">깍두기 1kg</span> <br />
                        <span className="price">7,300원</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="content_3">
            <div className="title">
                <span>THE KIMCHI's PICK</span> 
            </div>
            <div className="list">
                <div>
                    <div className="imgContent">
                        <img src="https://img.insight.co.kr/static/2022/12/14/700/img_20221214141750_q1l6i66s.webp" />
                    </div>
                    <div className="textContent">
                        <span className="productName">강릉 커피김치 480g</span> <br />
                        <span className="price">15,000원</span>
                    </div>
                </div>
                <div>                    
                    <div className="imgContent">
                        <img src="https://masism.kr/wp-content/uploads/2017/12/1.png" />
                    </div>
                    <div className="textContent">
                        <span className="productName">김치주스 500ml</span> <br />
                        <span className="price">6,000원</span>
                    </div>
                </div>
                <div>
                    <div className="imgContent">
                        <img src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201812/07/abe59107-372e-43eb-b7dc-cf3e8100cd93.jpg" />
                    </div>
                    <div className="textContent">
                        <span className="productName">김치칵테일 350ml</span> <br />
                        <span className="price">12,000원</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Content;