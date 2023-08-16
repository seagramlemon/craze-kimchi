import { Link } from "react-router-dom";
import "./NoticeContent.css";
import { useEffect, useState } from "react";
import axios from "axios";
function NoticeContent() {
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    axios.get("/notice/list").then((res) => {
      setNoticeList(res.data);
    });
  }, []);
  return (
    <div className="admin-notice">
      <div className="page-title">공지사항</div>
      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>조회수</th>
            <th>작성일</th>
            <th>상태</th>
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
    </div>
  );
}

const StautsSwitch = (props) => {
  const setNoticeList = props.setNoticeList;
  console.log("스위치함수", setNoticeList);
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
export default NoticeContent;
