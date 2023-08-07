import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../util/InputFrm";
import "./LoginContent.css";
import axios from "axios";
function LoginContent(props) {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const navigate = useNavigate();
  const login = () => {
    const memberId = document.querySelector("#memberId").value;
    const memberPw = document.querySelector("#memberPw").value;
    const sendData = { memberId, memberPw };
    if (memberId !== "" && memberPw !== "") {
      axios.post("/member/login", sendData).then((res) => {
        console.log(res.data);
        //response header에 Authorization 값으로 토큰을 넣는다.
        axios.defaults.headers.common["Authorization"] = res.data;
        //localStorage에 토큰 값 넣는다.
        window.localStorage.setItem("token", res.data);

        console.log(window.localStorage.getItem("token"));
        setIsLogin(true);
        navigate("/");
      });
    }
  };
  return (
    <div className="login-wrap">
      <h3 className="page-title">로그인</h3>
      <div className="input-wrap">
        <label htmlFor="memberId">ID</label>
        <Input type="text" name="memberId" id="memberId" />
      </div>
      <div className="input-wrap">
        <label htmlFor="memberPw">PASSWORD</label>
        <Input type="password" name="memberPw" id="memberPw" />
      </div>
      <div className="button-wrap">
        <Button className="btn" content="로그인" func={login}></Button>
      </div>
      <div className="link-wrap">
        <Link to="/join">회원가입</Link>
        <Link to="#">아이디/비밀번호 찾기</Link>
      </div>
    </div>
  );
}

export default LoginContent;
