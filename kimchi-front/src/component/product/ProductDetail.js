import {useLocation} from "react-router-dom";
import "./ProductDetail.css";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useEffect, useState} from "react";

function ProductDetail() {

    const [isLogin, setIsLogin] = useState(null);
    useEffect(() => {
      const token = window.localStorage.getItem("token");
      setIsLogin(token != null);
    }); // 몰?루 : 일단 로그인여부만 붙여둠

    const location = useLocation(); 
    let navigate = useNavigate();
    let product = location.state.product; 

    let [amount, setMount] = useState(0);

    const minusAmount = function() {
        if(amount > 0) {
            setMount(amount - 1);
        }
    };
    
    const plusAmount = function(e) {
        setMount(amount + 1);
    };

    const putCart = () => {

        if(amount > 0) {
            alert("장바구니에 상품이 담겼습니다.");
        } else {
            alert("수량을 선택해주세요.");
        }
    };

    const productUpdateForm = () => {
        navigate("/product/updateForm", {state : {productNo : product.productNo}});
    };

    const productDelete = () => {

        axios({
            url : "/product/delete",
            method : "post",
            data : {productNo : product.productNo},
            headers : {processData : false, 
                       Authorization: `Bearer ${window.localStorage.getItem("token")}`}
        }).then(function(response) {     
            
            if(response.data > 0) {
                alert("제품 삭제에 성공했습니다.");
                navigate("/product");
            } else {
                alert("삭제에 성공했습니다.");
            }
            
        }).catch(function() {
            console.log("실패");
        });
    };

    return (
        <div>
            <div className="forAdmin">
                {isLogin ? (<div>
                        <button className="btn" onClick={productUpdateForm}>상품 수정하기</button>
                        <button className="btn" onClick={productDelete}>상품 삭제하기</button>    
                    </div>
                ) : ( <div></div> )}
            </div>
            <div className="productDetail">
                <div className="productDetail_1">
                    <img src={product.thumbnailImg} width="300" height="300"/>
                </div>
                <div className="productDetail_2">
                    <h2>{product.productName}</h2>
                    <h3>{product.price} 원</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td width="150" height="70">판매단위</td>
                                <td width="300">1개</td>
                            </tr>
                            <tr>
                                <td height="70">수량선택</td>
                                <td>
                                    <button className="countBtn" onClick={minusAmount}>-</button>
                                    <input type="text" id="amount" value={amount} readOnly></input>
                                    <button className="countBtn" onClick={plusAmount}>+</button>    
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" height="40">
                                    <button className="btn" onClick={putCart}>장바구니 담기</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="productDetail_3" dangerouslySetInnerHTML={{ __html: product.detail }}>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;