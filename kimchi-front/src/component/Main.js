import "./Main.css";
import Header from "./common/Header";
import MainContent from "./common/MainContent";
import Footer from "./common/Footer";
import ProductContent from "./product/ProductContent";
import NoticeContent from "./notice/NoticeContent";
import ReviewContent from "./review/ReviewContent";
import CommunityContent from "./community/CommunityContent";
import LoginContent from "./member/LoginContent";
import { Routes, Route, Link } from "react-router-dom";
import MemberJoin from "./member/MemberJoin";
import ProductEnrollForm from "./product/ProductEnrollForm";
import { useState } from "react";
import Mypage from "./member/Mypage";

function Main() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="all-wrap">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/product" element={<ProductContent />} />
          <Route path="/notice" element={<NoticeContent />} />
          <Route path="/review" element={<ReviewContent />} />
          <Route path="/community" element={<CommunityContent />} />
          <Route
            path="/login"
            element={<LoginContent isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/join" element={<MemberJoin />} />
          <Route path="/insert.pr" element={<ProductEnrollForm />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
