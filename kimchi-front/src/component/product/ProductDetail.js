import {useLocation} from "react-router-dom";
import "./ProductDetail.css";
import {useState} from 'react';

function ProductDetail() {

    const location = useLocation(); 
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

    return (
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
                            <td width="100" height="70">상품설명</td>
                            <td width="300">{product.detail}</td>
                        </tr>
                        <tr>
                            <td height="70">판매단위</td>
                            <td>1개</td>
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
            <div className="productDetail_3">
                <img src="https://thekimchi.co.kr/web/upload/NNEditor/20230822/po.jpg" width="100%" />
            </div>
        </div>
    );
}

export default ProductDetail;