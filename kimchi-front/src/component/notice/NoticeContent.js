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
        <NoticeWriteFrm setStatus={setStatus} />
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
  const setStatus = props.setStatus;
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [upfiles, setUpfiles] = useState([]);
  const [showfiles, setShowfiles] = useState([]);
  const fileChange = (e) => {
    setUpfiles(e.currentTarget.files);
    const arr = new Array();
    for (let i = 0; i < e.currentTarget.files.length; i++) {
      const filename = e.currentTarget.files[i].name;
      const filesize = e.currentTarget.files[i].size;
      const obj = { filename, filesize };
      arr.push(obj);
    }
    setShowfiles(arr);
  };
  const titleChange = (e) => {
    setNoticeTitle(e.currentTarget.value);
  };
  const registNotice = () => {
    const form = new FormData();
    form.append("noticeTitle", noticeTitle);
    form.append("noticeContent", noticeContent);
    console.log(upfiles);
    for (let i = 0; i < upfiles.length; i++) {
      form.append("upfiles", upfiles[i]);
    }
    //form.append("upfiles", document.querySelector("#notice-file").files);
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
        if (response.data == 1) {
          setStatus(true);
        }
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

      <div className="notice-file-zone">
        {showfiles.map((file, idx) => {
          return <UploadFile file={file} key={"n-file" + idx} />;
        })}
      </div>
      <input
        type="file"
        multiple
        className="btn"
        onChange={fileChange}
        id="notice-file"
      />
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
const UploadFile = (props) => {
  const filename = props.file.filename;
  let filesize = props.file.filesize;
  let unit = " (Byte)";
  let count = 1;
  while (true) {
    if (filesize / 1024 < 1) {
      break;
    } else {
      filesize = filesize / 1024;
      count++;
    }
  }
  filesize = Math.round(filesize * 100) / 100;
  if (count === 2) {
    unit = " (KB)";
  } else if (count === 3) {
    unit = " (MB)";
  } else if (count === 4) {
    unit = " (GB)";
  }

  return (
    <div className="notice-file">
      <span className="material-icons delete-file">close</span>
      <span className="filename">{filename}</span>
      <span className="filesize">{filesize + unit}</span>
    </div>
  );
};
export default NoticeContent;
