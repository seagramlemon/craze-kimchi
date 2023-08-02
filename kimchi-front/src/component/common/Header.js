import "./Header.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

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
            <span id="search-btn" className="material-icons">
              search
            </span>
          </button>
        </div> */}
        <div className="member-link">
          <Link to="login" title="로그인">
            <span className="material-icons">login</span>
          </Link>
          <Link to="join" title="회원가입">
            <span className="material-icons">assignment_ind</span>
          </Link>
        </div>
      </div>
      <div className="main-nav">
        <ul>
          <li>
            <Link to="product">PRODUCT</Link>
          </li>
          <li>
            <Link to="notice">NOTICE</Link>
          </li>
          <li>
            <Link to="review">REVIEW</Link>
          </li>
          <li>
            <Link to="community">COMMUNITY</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
