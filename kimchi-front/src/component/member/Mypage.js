import axios from "axios";
import { useEffect, useState } from "react";

import "./Mypage.css";
import NoticeContent from "../notice/NoticeContent";
import MemberAdmin from "./MemberAdmin";
import { useNavigate } from "react-router-dom";

const SideMenu = (props) => {
  const menus = props.children;

  return (
    <div className="mypage-side">
      {menus.map((item) => {
        return item;
      })}
    </div>
  );
};

const Mypage = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState([]);
  const [myContent, setMyContent] = useState([]);
  const menus = [
    { title: "공지사항 관리", content: <NoticeContent />, type: 1 },
    { title: "회원 관리", content: <MemberAdmin />, type: 1 },
    { title: "공지사항 관리2", content: <NoticeContent />, type: 2 },
    { title: "회원 관리2", content: <MemberAdmin />, type: 2 },
  ];
  useEffect(() => {
    axios
      .get("/member/mypage", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMember(res.data);
      })
      .catch((res) => {
        console.log(res);
        if (res.response.status === 403) {
          navigate("/login");
        }
      });
  }, []);

  return (
    <div className="mypage">
      <div className="mypage-title">
        {member.memberType == 1 ? "관리자페이지" : "마이페이지"}
      </div>
      <SideMenu>
        {menus.map((item, index) => {
          if (item.type === member.memberType) {
            return (
              <div
                key={"navi" + index}
                onClick={(e) => {
                  const menu = document.querySelectorAll(".mypage-side>div");
                  menu.forEach((m) => {
                    m.classList.remove("active-tab");
                  });

                  e.currentTarget.classList.add("active-tab");
                  setMyContent(item.content);
                }}
              >
                <span>{item.title}</span>
                <span className="material-icons">keyboard_arrow_right</span>
              </div>
            );
          }
        })}
      </SideMenu>
      <div className="mypage-content">{myContent}</div>
    </div>
  );
};

export default Mypage;
