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

function Main() {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/product" element={<ProductContent />} />
          <Route path="/notice" element={<NoticeContent />} />
          <Route path="/review" element={<ReviewContent />} />
          <Route path="/community" element={<CommunityContent />} />
          <Route path="/login" element={<LoginContent />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
