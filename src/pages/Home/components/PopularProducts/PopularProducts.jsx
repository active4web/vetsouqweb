import "./PopularProducts.scss";
import Product from "../../../../components/Product/Product";
import SmallLoad from "../../../../components/SmallLoad/SmallLoad";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const PopularProducts = ({ data, loading }) => {

    return (
        <div className="popular-products">
            <div className="container">
                <h2 className="head-section">المنتجات الأكثر شعبية</h2>

                <div className="products-slider">
                    {loading ? <SmallLoad /> :
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={15}
                            speed={1000}
                            loop={true}
                            modules={[Pagination, Autoplay]}
                            className="mySwiper"
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                        >
                            {data?.data?.map(el => (
                                <SwiperSlide>
                                    <Product product={el} key={el.id} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    }
                </div>
            </div>
        </div>
    );
}

export default PopularProducts;