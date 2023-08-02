function ProductEnrollForm() {

    return (
        <div className="productEnrollForm-wrap">
            <div>
                <h3>제품 추가</h3>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>제품명</th>
                            <td><input id="productName" type="text" /></td>
                        </tr>
                        <tr>
                            <th>제품가격</th>
                            <td><input id="price" type="number" />원</td>
                        </tr>
                        <tr>
                            <th>제품설명</th>
                            <td><textarea id="productName" /></td>
                        </tr>
                        <tr>
                            <th>제품썸네일</th>
                            <td><input id="thumbnailImg" type="file" /></td>
                        </tr>
                        <tr>
                            <th>제품수량</th>
                            <td><input id="amount" type="number" />개</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default ProductEnrollForm;