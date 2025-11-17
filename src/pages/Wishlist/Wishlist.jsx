import { useTranslation } from "react-i18next";
import Loading from "../../components/Loading/Loading";
import Product from "../../components/Product/Product";
import { useGetFavQuery } from "../../redux/slice/cartSlice/cartSlice";
import { getUserToken } from "../../utils/CookisAuth";
import "./Wishlist.scss";

const Wishlist = () => {
    const { t } = useTranslation()
    const token = getUserToken();
    const { data = [], isLoading } = useGetFavQuery(token);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="wishlist">
            <div className="content">
                <h3>{t("wishlist")}</h3>

                {data.data.length > 0 ?
                    <div className="container">
                        {data.data.map((el) => (
                            <Product
                                product={el.product}
                                key={el.product.id}
                            />
                        ))}
                    </div>
                    :
                    <p className="no-data">لا يوجد منتجات فى المفضلة</p>
                }
            </div>
        </div>
    );
}

export default Wishlist;