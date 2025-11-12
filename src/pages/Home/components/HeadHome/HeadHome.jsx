import "./HeadHome.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LayoutGrid } from "lucide-react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination";

import Image1 from "../../../../assets/01.jpg";
import Image2 from "../../../../assets/002.jpg";
import Image3 from "../../../../assets/003.jpg";
import SmallLoad from "../../../../components/SmallLoad/SmallLoad";

const HeadHome = ({ categories, loading }) => {
    const { i18n } = useTranslation();

    return (
        <div className="head-home">
            <div className="container">
                <div className="categories">
                    {loading ? <SmallLoad /> :
                        <ul>
                            {categories?.data?.map(el => (
                                <li key={el.id}>
                                    <Link to="/">
                                        <span><LayoutGrid /></span>
                                        <span>{el.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    }
                </div>

                <div className="slider">
                    <Swiper
                        navigation={true}
                        className="mySwiper"
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Navigation, Autoplay, Pagination]}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        speed={1000}
                        loop={true}
                        dir="ltr"
                    >
                        <SwiperSlide>
                            <div className="box" dir={`${i18n.language === "ar" ? "rtl" : "ltr"}`}>
                                <img src={Image1} alt="image" />

                                <div className="info">
                                    <div className="content">
                                        <h1>عنوان كبير جدا جدا جدا</h1>
                                        <p>استمرار التمنيات في وضع خطأ مؤلم حكيم، فإن الألم الفادح الكبير ضروري لطرد ما هو الحد الأدنى من الألم الذي يتصوره أي خيار آخر.</p>
                                        <Link to="/">تسوق الان</Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="box" dir={`${i18n.language === "ar" ? "rtl" : "ltr"}`}>
                                <img src={Image2} alt="image" />

                                <div className="info">
                                    <div className="content">
                                        <h1>عنوان كبير جدا جدا جدا</h1>
                                        <p>استمرار التمنيات في وضع خطأ مؤلم حكيم، فإن الألم الفادح الكبير ضروري لطرد ما هو الحد الأدنى من الألم الذي يتصوره أي خيار آخر.</p>
                                        <Link to="/">تسوق الان</Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="box" dir={`${i18n.language === "ar" ? "rtl" : "ltr"}`}>
                                <img src={Image3} alt="image" />

                                <div className="info">
                                    <div className="content">
                                        <h1>عنوان كبير جدا جدا جدا</h1>
                                        <p>استمرار التمنيات في وضع خطأ مؤلم حكيم، فإن الألم الفادح الكبير ضروري لطرد ما هو الحد الأدنى من الألم الذي يتصوره أي خيار آخر.</p>
                                        <Link to="/">تسوق الان</Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default HeadHome;