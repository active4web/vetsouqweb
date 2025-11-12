import Product from "../../../../components/Product/Product";
import "./PopularProducts.scss";

const PopularProducts = ({ data, loading }) => {
    console.log(data);

    return (
        <div className="popular-products">
            <div className="container">
                <h2>المنتجات الأكثر شعبية</h2>

                <div className="products-slider">
                    {data?.data?.map(el => (
                        <Product product={el} key={el.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PopularProducts;