import axios from "axios";
import { useEffect, useState } from "react";

const Mypage = () => {
  const [member, setMember] = useState(null);
  console.log(window.localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get("/member/mypage", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  });

  return <div>마이페이지 </div>;
};

export default Mypage;
