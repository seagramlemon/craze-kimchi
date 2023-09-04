import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./NoticeView.css";

const NoticeView = () => {
  const location = useLocation();
  const noticeNo = location.state.noticeNo;
  const [notice, setNotice] = useState({});
  useEffect(() => {
    axios.get("/notice/view/" + noticeNo).then((res) => {
      setNotice(res.data);
    });
  }, []);
  return (
    <div className="notice-view">
      <table className="notice-view-tbl">
        <tbody>
          <tr>
            <td>제목</td>
            <td className="notice-title">{notice.noticeTitle}</td>
          </tr>
          <tr>
            <td>작성일</td>
            <td>{notice.noticeRegDate}</td>
          </tr>
          <tr>
            <td>조회수</td>
            <td>{notice.noticeReadCount}</td>
          </tr>
          <FileList fileList={notice.fileList} />
          <tr>
            <td colSpan={2} className="notice-content">
              <div
                dangerouslySetInnerHTML={{ __html: notice.noticeContent }}
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const FileList = (props) => {
  let fileList = props.fileList;
  if (fileList === undefined) {
    fileList = new Array();
  }

  return (
    <tr>
      <td>첨부파일</td>
      <td colSpan={3}>
        {fileList !== undefined &&
          fileList.map((item, index) => {
            return <FileItem key={"n" + index} item={item} />;
          })}
      </td>
    </tr>
  );
};

const FileItem = (prop) => {
  const item = prop.item;
  const filedown = () => {
    axios
      .get("/notice/filedownload/" + item.noticeFileNo, {
        //axios의 기본 responseType : "json" -> 받을게 파일이므로
        responseType: "blob",
      })
      .then((res) => {
        // 다운로드(서버에서 전달 받은 데이터) 받은 바이너리 데이터를 blob으로 변환합니다.
        const blob = new Blob([res.data]);

        // blob을 사용해 객체 URL을 생성
        const fileObjectUrl = window.URL.createObjectURL(blob);

        // blob 객체 URL을 설정할 링크 생성
        const link = document.createElement("a");
        link.href = fileObjectUrl;
        link.style.display = "none"; //해당링크를 화면에는 보이지 않도록 처리

        // 다운로드 파일 이름을 추출하는 함수
        const extractDownloadFilename = (res) => {
          const disposition = res.headers["content-disposition"];
          //Controller에서 인코딩해서 보냈으므로 DecodeURI로 디코딩
          const fileName = decodeURI(
            disposition
              .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
              .replace(/['"]/g, "")
          );
          return fileName;
        };
        // 다운로드 파일 이름 지정
        link.download = extractDownloadFilename(res);
        // link.download = "테스트.xlsx";//위에 디코딩하는 함수를 통해서 이름을 얻어옴

        // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행
        document.body.appendChild(link);
        link.click();
        link.remove();

        // 다운로드가 끝난 리소스(객체 URL)를 해제
        window.URL.revokeObjectURL(fileObjectUrl);
      });
  };
  return (
    <div className="notice-file">
      <span className="material-icons file-icon" onClick={filedown}>
        file_download
      </span>
      <span className="file-name">{item.noticeFileName}</span>
    </div>
  );
};
export default NoticeView;
