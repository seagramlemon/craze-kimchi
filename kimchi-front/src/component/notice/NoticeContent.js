import { Link } from "react-router-dom";
import "./NoticeContent.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TextEditor from "../util/TextEditor";
function NoticeContent() {
  const [status, setStatus] = useState(true);
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    axios.get("/notice/list").then((res) => {
      setNoticeList(res.data);
    });
  }, []);
  return (
    <div className="admin-notice">
      <div className="page-title">공지사항</div>
      {status ? (
        <NoticeList
          noticeList={noticeList}
          setNoticeList={setNoticeList}
          setStatus={setStatus}
        />
      ) : (
        <NoticeWriteFrm />
      )}
    </div>
  );
}

const StautsSwitch = (props) => {
  const setNoticeList = props.setNoticeList;
  return (
    <>
      {props.noticeStatus == 1 ? (
        <input
          name="noticeStatus"
          value="1"
          type="checkbox"
          id={"switch" + props.noticeNo}
          className="toggle"
          hidden
          checked
          onChange={(e) => {
            changeStatus(e.currentTarget, props.noticeNo, setNoticeList);
          }}
          readOnly
        />
      ) : (
        <input
          name="noticeStatus"
          value="2"
          type="checkbox"
          id={"switch" + props.noticeNo}
          className="toggle"
          hidden
          onChange={(e) => {
            changeStatus(e.currentTarget, props.noticeNo, setNoticeList);
          }}
          readOnly
        />
      )}

      <label htmlFor={"switch" + props.noticeNo} className="toggleSwitch">
        <span className="toggleButton"></span>
      </label>
    </>
  );
};

const changeStatus = (input, noticeNo, setNoticeList) => {
  console.log("axios", setNoticeList);
  console.log(input, noticeNo);
  const noticeStatus = input.checked ? 1 : 2;
  axios
    .post(
      "/notice/changeStatus",
      { noticeNo, noticeStatus },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      if (res.data != null) {
        setNoticeList(res.data);
      }
    });
};

const NoticeList = (props) => {
  console.log("리스트");
  const noticeList = props.noticeList;
  const setNoticeList = props.setNoticeList;
  const setStatus = props.setStatus;
  return (
    <>
      <button
        id="notice-reg-btn"
        className="btn"
        onClick={() => {
          setStatus(false);
        }}
      >
        공지사항 작성
      </button>
      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>조회수</th>
            <th>작성일</th>
            <th>공개</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.map((notice, index) => {
            return (
              <tr key={"notice" + index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={"/notice" + notice.noticeNo}>
                    {notice.noticeTitle}
                  </Link>
                </td>
                <td>{notice.noticeReadCount}</td>
                <td>{notice.noticeRegDate}</td>
                <td>
                  <StautsSwitch
                    noticeStatus={notice.noticeStatus}
                    noticeNo={notice.noticeNo}
                    setNoticeList={setNoticeList}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const NoticeWriteFrm = (props) => {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [upfiles, setUpfiles] = useState([]);
  const fileChange = (e) => {
    setUpfiles(e.currentTarget.files);
  };
  const titleChange = (e) => {
    setNoticeTitle(e.currentTarget.value);
  };
  const registNotice = () => {
    const form = new FormData();
    form.append("noticeTitle", noticeTitle);
    form.append("noticeContent", noticeContent);
    form.append("upfiles", upfiles);
    axios({
      url: "/notice/insert",
      method: "post",
      data: form,
      headers: {
        processData: false,
        contentType: "multipart/form-data",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function () {
        console.log("실패");
      });
  };
  return (
    <div className="noticeWriteFrm">
      <div className="notice-title-box">
        <input
          type="text"
          className="input-form"
          placeholder="제목을 입력하세요"
          value={noticeTitle}
          onChange={titleChange}
        />
      </div>
      <div className="notice-file">
        <input type="file" multiple className="btn" onChange={fileChange} />
      </div>
      <div className="notice-content-box">
        <TextEditor
          data={noticeContent}
          setData={setNoticeContent}
          placeholder="공지사항 내용을 입력하세요..."
        />
      </div>
      <div className="notice-write-btn">
        <button className="btn" onClick={registNotice}>
          작성하기
        </button>
      </div>
    </div>
  );
};
export default NoticeContent;
