import "./ProductDetails.scss";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import 'swiper/css';

import Product from "../../components/Product/Product";
import ProductInfo from "./ProductInfo/ProductInfo";
import Tabs from "./Tabs/Tabs";
import { useProductDetailsQuery, useReviewsProductQuery }
    from "../../redux/slice/productsSlice/productsSlice";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetCartQuery } from "../../redux/slice/cartSlice/cartSlice";
import { getUserToken } from "../../utils/CookisAuth";
import Loading from "../../components/Loading/Loading";

const ProductDetails = () => {
    const { t, i18n } = useTranslation();
    const { id1, id2 } = useParams();
    const token = getUserToken();
    const firebase_token = localStorage.getItem("fcmToken");
    const { data: productDetails = {}, isFetching } = useProductDetailsQuery({
        lang: i18n.language,
        id: id2
    });

    const { data: reviewsProduct = {}, isLoading: loadReviews } = useReviewsProductQuery({
        lang: i18n.language,
        id: id2
    });

    const { data: cart = [], isLoading } = useGetCartQuery({
        lang: i18n.language,
        token: token,
        firebase_token: firebase_token
    });

    if (isFetching || isLoading || loadReviews) {
        return <Loading />
    }

    return (
        <div className="product-details">
            <div className="content">
                <div className="container">
                    <ProductInfo
                        productDetails={productDetails}
                        cart={cart}
                    />

                    <Tabs
                        reviews={reviewsProduct?.data?.list}
                        productId={id2}
                    />

                    <div className="related-product">
                        <h3>{t("related_products")}</h3>

                        <div className="products">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={10}
                                slidesPerView={4}
                                speed={1000}
                                loop={productDetails?.Data?.["Related Products"]?.length > 4}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    480: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                    },
                                }}
                                className="mySwiper"
                            >
                                {productDetails?.Data?.["Related Products"]?.map((el) => (
                                    <SwiperSlide key={el.id}>
                                        <Product
                                            product={el}
                                            catid={id1}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;