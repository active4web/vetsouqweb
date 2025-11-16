import "./Discounts.scss";
import Product from "../../../../components/Product/Product";
import SmallLoad from "../../../../components/SmallLoad/SmallLoad";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Discounts = ({ data, loading }) => {
    const { t } = useTranslation();

    return (
        <div className="discounts">
            <div className="container">
                <h2 className="head-section">{t("dont_miss_this_week_offers")}</h2>

                <div className="products-slider">
                    {loading ? <SmallLoad /> :
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={15}
                            speed={1000}
                            loop={data?.data?.products.length > 4}
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
                            {data?.data?.products.map(el => (
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

export default Discounts;