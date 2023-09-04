import { useEffect, useState } from "react";
import "./NoticeList.css";
import axios from "axios";
import PagingBar from "../common/PagingBar";
import { useNavigate } from "react-router-dom";

const NoticeList = () => {
  const [noticeList, setNoticeList] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  useEffect(() => {
    axios.get("/notice/list/" + currentPage).then((res) => {
      console.log(res);
      setNoticeList(res.data.list);
      let paging = [];
      for (let i = res.data.pi.startPage; i <= res.data.pi.endPage; i++) {
        paging.push(i);
      }
      setPageList(paging);
      setStart(res.data.start);
    });
  }, [currentPage]);

  return (
    <div className="notice-list">
      <div className="notice-title">
        <span>공지사항</span>
        <span className="material-icons">campaign</span>
      </div>
      <table className="notice-tbl">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.map((item, index) => {
            return (
              <NoticeListItem
                item={item}
                key={"n" + index}
                start={start}
                index={index}
              />
            );
          })}
        </tbody>
      </table>
      <div>
        <PagingBar
          pageList={pageList}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
const NoticeListItem = (props) => {
  const item = props.item;
  const start = props.start;
  const index = props.index;
  const navigate = useNavigate();
  const noticeDetail = () => {
    navigate("/notice/view", { state: { noticeNo: item.noticeNo } });
  };
  return (
    <tr onClick={noticeDetail}>
      <td>{start + index}</td>
      <td>{item.noticeTitle}</td>
      <td>{item.noticeReadCount}</td>
      <td>{item.noticeRegDate}</td>
    </tr>
  );
};
export default NoticeList;
