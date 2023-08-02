import { Link } from "react-router-dom";
import { Button, Input } from "../util/InputFrm";
import "./LoginContent.css";
function LoginContent() {
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
        <Button className="btn" content="로그인"></Button>
      </div>
      <div className="link-wrap">
        <Link to="/join">회원가입</Link>
        <Link to="#">아이디/비밀번호 찾기</Link>
      </div>
    </div>
  );
}

export default LoginContent;
