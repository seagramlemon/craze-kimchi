import { Link, useNavigate } from "react-router-dom";
import "./NoticeContent.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TextEditor from "../util/TextEditor";
function NoticeContent() {
  const [status, setStatus] = useState(true);
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    axios.get("/notice/allList").then((res) => {
      console.log("전체목록");
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
        <NoticeWriteFrm setStatus={setStatus} setNoticeList={setNoticeList} />
      )}
    </div>
  );
}

const StautsSwitch = (props) => {
  const changeStatus = (input, noticeNo, setNoticeList) => {
    const noticeStatus = input.checked ? 1 : 2;
    console.log("axios", noticeStatus);
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

const NoticeList = (props) => {
  console.log(1);
  const noticeList = props.noticeList;
  const setNoticeList = props.setNoticeList;
  const setStatus = props.setStatus;
  const navigate = useNavigate();
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
                  <span
                    onClick={() => {
                      navigate("/notice/view", {
                        state: { noticeNo: notice.noticeNo },
                      });
                    }}
                  >
                    {notice.noticeTitle}
                  </span>
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
  const setNoticeList = props.setNoticeList;
  const setStatus = props.setStatus;
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  let fileNo = 1;
  const titleChange = (e) => {
    setNoticeTitle(e.currentTarget.value);
  };
  const registNotice = () => {
    const form = new FormData();
    form.append("noticeTitle", noticeTitle);
    form.append("noticeContent", noticeContent);
    for (let i = 0; i < fileList.length; i++) {
      form.append("upfiles", fileList[i].file);
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
          axios.get("/notice/allList").then((res) => {
            setNoticeList(res.data);
          });
          setStatus(true);
        }
      })
      .catch(function () {
        console.log("실패");
      });
  };
  const fileDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const fileDrop = (e) => {
    e.preventDefault();
    const files = [...fileList];

    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const obj = { fileNo: fileNo++, file: e.dataTransfer.files[i] };
      files.push(obj);
    }
    setFileList(files);

    if (fileList.length + e.dataTransfer.files.length != 0) {
      document.querySelector(".notice-file-msg").classList.add("hide");
    } else {
      document.querySelector(".notice-file-msg").classList.remove("hide");
    }
  };
  const fileDragEnter = (e) => {
    e.preventDefault();
  };
  const fileDragLeave = (e) => {
    e.preventDefault();
  };
  const deleteFile = (fileNo) => {
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].fileNo === fileNo) {
        fileList.splice(i, 1);
        setFileList([...fileList]);
        break;
      }
    }
    if (fileList.length == 0) {
      document.querySelector(".notice-file-msg").classList.remove("hide");
    }
  };
  return (
    <div className="noticeWriteFrm">
      <div className="notice-title-box">
        <input
          type="text"
          className="input-form"
          placeholder="제목을 입력하세요"
          value={noticeTitle || ""}
          onChange={titleChange}
        />
      </div>

      <div
        draggable
        className="notice-file-zone"
        onDragOver={fileDragOver}
        onDrop={fileDrop}
        onDragEnter={fileDragEnter}
        onDragLeave={fileDragLeave}
      >
        <div className="notice-file-msg">여기에 첨부파일을 올려주세요</div>
        {fileList.map((item, idx) => {
          return (
            <UploadFile
              file={item.file}
              index={item.fileNo}
              key={"n-file" + idx}
              deleteFile={deleteFile}
            />
          );
        })}
      </div>
      <div className="notice-content-box">
        <TextEditor
          data={noticeContent || ""}
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
  const file = props.file;
  const fileNo = props.index;
  const deleteFile = props.deleteFile;
  const filename = file.name;
  let filesize = file.size;
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
      <span
        className="material-icons delete-file"
        onClick={() => {
          deleteFile(fileNo, this);
        }}
      >
        close
      </span>
      <span className="filename">{filename}</span>
      <span className="filesize">{filesize + unit}</span>
    </div>
  );
};
export default NoticeContent;
