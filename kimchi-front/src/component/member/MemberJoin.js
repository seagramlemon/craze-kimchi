import { useState } from "react";
import { Button, CheckBox, Input } from "../util/InputFrm";
import "./MemberJoin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MemberJoin = () => {
  const inputStatusCheck = (input) => {
    return (
      input.classList.contains("valid") ||
      input.classList.contains("invalid") ||
      input.value !== ""
    );
  };

  const idCheck = (e) => {
    const idReg = /^[a-zA-Z0-9]{4,32}$/;
    const input = e.target;

    if (inputStatusCheck(input)) {
      if (idReg.test(input.value)) {
        //여기 중복체크 넣어야 함
        axios
          .get("/member/" + input.value)
          .then((res) => {
            if (res.data === "") {
              input.classList.remove("invalid");
              input.classList.add("valid");
              setIdMsg("사용 가능한 아이디 입니다.");
            } else {
              input.classList.remove("valid");
              input.classList.add("invalid");
              setIdMsg("이미 사용중인 아이디 입니다.");
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
        setIdMsg("아이디는 영어/숫자로 4~24글자 입니다.");
      }
    }
  };
  const pwCheck = (e) => {
    const pwReg = [/^.{8,30}$/, /[a-z]/, /[A-Z]/, /[0-9]/];
    const pw = e.target;
    if (inputStatusCheck(pw)) {
      const pwRe = document.querySelector("#memberPwRe");
      let checkValue = true;
      for (let i = 0; i < pwReg.length; i++) {
        if (!pwReg[i].test(pw.value)) {
          checkValue = false;
          break;
        }
      }
      if (checkValue) {
        pw.classList.remove("invalid");
        pw.classList.add("valid");
        setPwMsg("사용가능한 비밀번호 입니다.");
      } else {
        pw.classList.remove("valid");
        pw.classList.add("invalid");
        setPwMsg(
          "비밀번호는 영어대/소문자 및 숫자를 반드시 포함하여 8~30글자 입니다."
        );
      }
      if (inputStatusCheck(pwRe)) {
        if (pw.value === pwRe.value) {
          pwRe.classList.remove("invalid");
          pwRe.classList.add("valid");
          setPwReMsg("비밀번호가 일치합니다.");
        } else {
          pwRe.classList.remove("valid");
          pwRe.classList.add("invalid");
          setPwReMsg("비밀번호가 일치하지 않습니다.");
        }
      }
    }
  };
  const pwReCheck = (e) => {
    const pw = document.querySelector("#memberPw");
    const pwRe = e.target;
    if (inputStatusCheck(pwRe)) {
      if (inputStatusCheck(pw)) {
        if (pw.value === pwRe.value) {
          pwRe.classList.remove("invalid");
          pwRe.classList.add("valid");
          setPwReMsg("비밀번호가 일치합니다.");
        } else {
          pwRe.classList.remove("valid");
          pwRe.classList.add("invalid");
          setPwReMsg("비밀번호가 일치하지 않습니다.");
        }
      }
    }
  };
  const nameCheck = (e) => {
    const input = e.target;
    if (inputStatusCheck(input)) {
      const inputValue = input.value;
      const nameReg = /[ㅏ-ㅣㄱ-ㅎ0-9]/;
      let byte = 0;
      for (var i = 0; i < inputValue.length; ++i) {
        // 기본 한글 3바이트 처리
        inputValue.charCodeAt(i) > 127 ? (byte += 3) : byte++;
      }
      if (inputValue !== "" && !nameReg.test(inputValue) && byte < 32) {
        input.classList.remove("invalid");
        input.classList.add("valid");
        setNameMsg("사용가능한 이름 입니다.");
      } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
        setNameMsg("이름을 확인해주세요.");
      }
    }
  };
  let [mailCode, setMailCode] = useState(null);
  const emailCheck = (e) => {
    const emailReg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const input = e.target.previousElementSibling;
    console.log(e.target, input);
    if (inputStatusCheck(input)) {
      if (emailReg.test(input.value)) {
        input.classList.remove("invalid");
        input.classList.remove("valid");
        setEmailMsg("");
        document.querySelector(".email-modal-wrap").classList.add("show-flex");
        const sendData = { memberEmail: input.value };
        axios.post("/member/authMail", sendData).then((res) => {
          if (res.data === 1) {
            input.classList.add("invalid");
            setEmailMsg("이미 사용중인 이메일 입니다.");
            document.querySelector(".email-dup").classList.add("show-flex");
          } else {
            setMailCode(res.data);
            document.querySelector(".auth-box").classList.add("show-flex");
            timeStart();
          }
        });
      } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
        setEmailMsg("이메일 주소를 확인하세요.");
      }
    }
  };
  let [intervalId, setIntervalId] = useState(null);
  const timeStart = () => {
    const min = document.querySelector("#auth-min");
    const sec = document.querySelector("#auth-sec");
    min.innerText = 5;
    sec.innerText = "00";
    const interval = window.setInterval(() => {
      const currMin = Number(min.innerText);
      const currSec = Number(sec.innerText);
      if (currSec === 0) {
        if (currMin === 0) {
          window.clearInterval(intervalId);
          setIntervalId(null);
        } else {
          min.innerText = currMin - 1;
          sec.innerText = 59;
        }
      } else {
        if (currSec <= 10) {
          sec.innerText = "0" + (currSec - 1);
        } else {
          sec.innerText = currSec - 1;
        }
      }
    }, 1000);
    setIntervalId(interval);
  };

  const [idMsg, setIdMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwReMsg, setPwReMsg] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const joinInput = [
    {
      content: "memberId",
      type: "text",
      label: "아이디",
      func: idCheck,
      checkFunction: inputStatusCheck,
      msg: idMsg,
    },
    {
      content: "memberPw",
      type: "password",
      label: "비밀번호",
      func: pwCheck,
      checkFunction: inputStatusCheck,
      msg: pwMsg,
    },
    {
      content: "memberPwRe",
      type: "password",
      label: "비밀번호 확인",
      func: pwReCheck,
      checkFunction: inputStatusCheck,
      msg: pwReMsg,
    },
    {
      content: "memberName",
      type: "text",
      label: "이름",
      func: nameCheck,
      checkFunction: inputStatusCheck,
      msg: nameMsg,
    },
  ];
  const [emailInput, setEmailInput] = useState({
    content: "memberEmail",
    type: "text",
    label: "이메일",
    func: emailCheck,
    checkFunction: inputStatusCheck,
    msg: emailMsg,
  });
  const navigate = useNavigate();
  const memberEnroll = () => {
    const useCheck = document.querySelector("#useCheck");
    const privacyCheck = document.querySelector("#privacyCheck");
    const valid = document.querySelectorAll("input.valid");
    console.log(useCheck.checked);
    console.log(privacyCheck.checked);
    console.log(valid);
    if (useCheck.checked && privacyCheck.checked && valid.length == 5) {
      const memberId = document.querySelector("#memberId").value;
      const memberPw = document.querySelector("#memberPw").value;
      const memberName = document.querySelector("#memberName").value;
      const memberEmail = document.querySelector("#memberEmail").value;
      const param = {
        memberId: memberId,
        memberPw: memberPw,
        memberName: memberName,
        memberEmail: memberEmail,
      };
      axios.post("/member/enroll", param).then((res) => {
        if (res.data == 1) {
          navigate("/login");
        } else {
          navigate("/");
        }
      });
    } else {
      alert("약관체크나, 입력값 확인, 디자인은 나중에");
    }
  };
  return (
    <>
      <div className="joinWrap">
        <h3 className="page-title">회원가입</h3>
        {joinInput.map((item, index) => {
          return (
            <InputWrap
              key={"i" + index}
              content={item.content}
              type={item.type}
              label={item.label}
              func={item.func}
              msg={item.msg}
              changeMsg={item.changeMsg}
            />
          );
        })}
        <div className="input-wrap">
          <div>
            <label htmlFor={emailInput.content}>{emailInput.label}</label>
          </div>
          <div>
            <Input
              id={emailInput.content}
              name={emailInput.content}
              type={emailInput.type}
            />
            <Button
              content="인증하기"
              className="btn emailBtn"
              func={emailCheck}
            />
            <p>{emailInput.msg}</p>
          </div>
        </div>
        <div className="policy-wrap">
          <div className="policy">
            <div className="check-zone">
              <CheckBox id="allCheck" name="allCheck" value="" />
              <label htmlFor="allCheck">전체 약관 동의하기</label>
            </div>
          </div>
          <div className="policy">
            <div className="check-zone">
              <CheckBox id="useCheck" name="useCheck" value="" />
              <label htmlFor="useCheck">
                이용약관 동의 <span className="req">(필수)</span>
              </label>
            </div>
            <a href="#">
              <span>약관보기</span>
              <span className="material-icons">keyboard_arrow_right</span>
            </a>
          </div>
          <div className="policy">
            <div className="check-zone">
              <CheckBox id="privacyCheck" name="privacyCheck" value="" />
              <label htmlFor="privacyCheck">
                개인정보 수집 및 이용 동의 <span className="req">(필수)</span>
              </label>
            </div>
            <a href="#">
              <span>약관보기</span>
              <span className="material-icons">keyboard_arrow_right</span>
            </a>
          </div>
          <div className="policy">
            <div className="check-zone">
              <CheckBox id="optionCheck" name="optionCheck" value="" />
              <label htmlFor="optionCheck">
                광고성 메세지 수신 동의
                <span>(선택)</span>
              </label>
            </div>
            <a href="#">
              <span>약관보기</span>
              <span className="material-icons">keyboard_arrow_right</span>
            </a>
          </div>
        </div>
        <div className="join-btn">
          <Button content="가입하기" className="btn" func={memberEnroll} />
        </div>
      </div>
      <EmailModal
        intervalId={intervalId}
        mailCode={mailCode}
        setMailCode={setMailCode}
      ></EmailModal>
    </>
  );
};

const InputWrap = (props) => {
  return (
    <div className="input-wrap">
      <div>
        <label htmlFor={props.content}>{props.label}</label>
      </div>
      <div>
        <Input
          id={props.content}
          name={props.content}
          type={props.type}
          func={props.func}
        />
        <p>{props.msg}</p>
      </div>
    </div>
  );
};
const EmailModal = (props) => {
  let intervalId = props.intervalId;
  const mailCode = props.mailCode;
  const setMailCode = props.setMailCode;
  const input = document.querySelector("#emailAuth");
  const closeEmailModal = () => {
    window.clearInterval(intervalId);
    setMailCode(null);
    document.querySelector(".email-modal-wrap").classList.remove("show-flex");
    document.querySelector(".email-dup").classList.remove("show-flex");
    document.querySelector(".auth-box").classList.remove("show-flex");
    input.value = "";
  };
  const checkAuth = (e) => {
    if (input.value === mailCode) {
      document.querySelector("#memberEmail").classList.add("valid");
      document.querySelector(".emailBtn").nextElementSibling.innerText =
        "인증되었습니다.";
      closeEmailModal();
    } else {
      input.style.borderColor = "#f44336";
    }
  };
  return (
    <div className="email-modal-wrap">
      <div className="email-modal-content">
        <div className="email-modal-top">
          <h3>이메일 인증코드 입력</h3>
          <span
            className="material-icons email-modal-close"
            onClick={closeEmailModal}
          >
            close
          </span>
        </div>
        <div className="email-modal-auth">
          <div className="auth-box">
            <div className="email-code-input">
              <Input type="text" id="emailAuth" name="emailAuth" />
              <div className="email-auth-time">
                <span id="auth-min"></span>
                <span> : </span>
                <span id="auth-sec"></span>
              </div>
            </div>
            <div className="email-code-btn">
              <Button
                content="인증하기"
                className="btn"
                func={checkAuth}
              ></Button>
            </div>
          </div>
          <div className="email-dup">이미 사용중인 이메일 입니다.</div>
        </div>
      </div>
    </div>
  );
};
export default MemberJoin;
