import "./Header.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper";
import { useState } from "react";
function Header() {
  const [swiper, setSwiper] = useState(null);

  SwiperCore.use([Autoplay]);

  const swiperParams = {
    navigation: false,
    onSwiper: setSwiper,
    autoplay: { delay: 3000, disableOnInteraction: false },
    loop: true,
    direction: "vertical",
  };
  return (
    <header>
      <div className="header">
        <div className="site-logo">
          <a href="/">
            <Swiper {...swiperParams} ref={setSwiper}>
              <SwiperSlide>
                <div className="site-top"></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="site-bottom"></div>
              </SwiperSlide>
            </Swiper>
          </a>
        </div>

        {/* <div className="search-box">
          <input type="text" id="searchInput"></input>
          <button>
            <span id="search-btn" class="material-icons">
              search
            </span>
          </button>
        </div> */}
        <div className="member-link">
          <a href="#" title="로그인">
            <span class="material-icons">login</span>
          </a>
          <a href="#" title="회원가입">
            <span class="material-icons">assignment_ind</span>
          </a>
        </div>
      </div>
      <div className="main-nav">
        <ul>
          <li>
            <a href="#">PRODUCT</a>
          </li>
          <li>
            <a href="#">NOTICE</a>
          </li>
          <li>
            <a href="#">REVIEW</a>
          </li>
          <li>
            <a href="#">COMMUNITY</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
