import PagingItem from "../common/PagingItem";
import "./PagingBar.css";

function PagingBar(props) {
    const list = props.pageList;
    console.log("pagingBar",list);
    const currentPage = props.currentPage;
    const setCurrentPage = props.setCurrentPage;
    return (
        <div className="pagingBar">
            {
                list.map((item) => {
                    if(currentPage === item) {
                        return (<PagingItem pageNo={item} currentPage={true} setCurrentPage={setCurrentPage}/>);
                    } else {
                        return (<PagingItem pageNo={item} currentPage={false} setCurrentPage={setCurrentPage} />);
                    } 
                })
            }
        </div>
    );
}

export default PagingBar;