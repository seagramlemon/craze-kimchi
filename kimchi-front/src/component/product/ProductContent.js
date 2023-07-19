import './ProductContent.css';
import ProductItem from './ProductItem';

function ProductContent() {

    return (
        <div>
            <div>
                <h3 className="productTitle">KIMCHI</h3>
            </div>
            <div>
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
            <div>

            </div>
        </div>

    );

}

export default ProductContent;