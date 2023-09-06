import "./ProductEnrollForm.css";
import {useState} from 'react';
import axios from "axios";
import ProductTextEditor from "./ProductTextEditor";

function ProductEnrollForm() {

    let [detail, setDetail] = useState("");
    const insertProduct = () => {
        
        let productName = document.getElementById("productName").value;
        let price = document.getElementById("price").value;
        let amount = document.getElementById("amount").value;
        let upfile = document.getElementById("thumbnailImg").files[0];

        const form = new FormData();

        form.append("productName", productName);
        form.append("price", price);
        form.append("detail", detail);
        form.append("amount", amount);
        form.append("upfile", upfile);

        console.log(productName);
        console.log(price);
        console.log(detail);
        console.log(amount);
        console.log(upfile);

        axios({
            url : "/product/insert",
            method : "post",
            data : form,
            headers : {processData : false, 
                       contentType : "multipart/form-data",
                       Authorization: `Bearer ${window.localStorage.getItem("token")}`}
        }).then(function(response) {            
            console.log(response.data);
        }).catch(function() {
            console.log("실패");
        });
    };

    return (
        <div className="productEnrollForm-wrap">
            <h3 className="page-title">제품 추가</h3>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>제품명</th>
                            <td><input id="productName" className="input-form" type="text" /></td>
                        </tr>
                        <tr>
                            <th>제품가격</th>
                            <td><input id="price" className="input-form" type="number" /></td>
                        </tr>
                        <tr>
                            <th>제품설명</th>
                            <td>
                                <div className="product-content-box">
                                    <ProductTextEditor
                                        data={detail || ""}
                                        setData={setDetail}
                                        placeholder="상품 상세 설명 입력"
                                    />
                                </div>    
                            </td>
                        </tr>
                        <tr>
                            <th>제품썸네일</th>
                            <td><input id="thumbnailImg" className="input-form" type="file" /></td>
                        </tr>
                        <tr>
                            <th>제품수량</th>
                            <td><input id="amount" className="input-form" type="number" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn-area"><button className="btn" onClick={insertProduct}>추가하기</button></div>
            </div>
        </div>
    );
}

export default ProductEnrollForm;