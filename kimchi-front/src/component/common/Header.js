import "./Header.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper";
import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header(props) {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const [swiper, setSwiper] = useState(null);
  SwiperCore.use([Autoplay]);
  const navigate = useNavigate();
  const logout = () => {
    console.log(1111);
    axios.get("/member/logout").then((res) => {
      window.localStorage.removeItem("token");
      setIsLogin(false);

      axios.defaults.headers.common["Authorization"] = null;
      navigate("/");
    });
  };
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
          <Link to="/">
            <Swiper {...swiperParams} ref={setSwiper}>
              <SwiperSlide>
                <div className="site-top"></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="site-bottom"></div>
              </SwiperSlide>
            </Swiper>
          </Link>
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
          {isLogin ? (
            <>
              <Link to="mypage" title="마이페이지">
                <span className="material-icons">person</span>
              </Link>
              <Link to="#" title="로그아웃" onClick={logout}>
                <span className="material-icons">logout</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="login" title="로그인">
                <span className="material-icons">login</span>
              </Link>
              <Link to="join" title="회원가입">
                <span className="material-icons">assignment_ind</span>
              </Link>
            </>
          )}
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
