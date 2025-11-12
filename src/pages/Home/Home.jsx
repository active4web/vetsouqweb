import "./Home.scss";
import { useTranslation } from "react-i18next";
import Services from "../../components/Services/Services";
import HeadHome from "./components/HeadHome/HeadHome";
import { useHomePageQuery, useServicesQuery } from "../../redux/slice/homeSlice/homeSlice";
import { useAllCatigoriesQuery, useBestSellersQuery } from "../../redux/slice/productsSlice/productsSlice";
import PopularProducts from "./components/PopularProducts/PopularProducts";

const Home = () => {
    const { i18n } = useTranslation();
    const {
        data: homeData = {},
        isLoading: loadHome,
        isFetching: fetchHome
    } = useHomePageQuery(i18n.language, { skip: true });
    const {
        data: mainCategories = [],
        isLoading: loadCat,
        isFetching: fetchCat
    } = useAllCatigoriesQuery({ lang: i18n.language });
    const {
        data: services = [],
        isLoading: loadServ,
        isFetching: fetchServ
    } = useServicesQuery(i18n.language);
    const {
        data: bestSellers = [],
        isLoading: loadBestSellers,
        isFetching: fetchBestSellers
    } = useBestSellersQuery(i18n.language);

    return (
        <div className="home">
            <HeadHome
                slider={homeData}
                categories={mainCategories}
                loading={loadHome || loadCat || fetchHome || fetchCat}
            />

            <Services
                data={services}
                loading={loadServ || fetchServ}
            />

            <PopularProducts
                data={bestSellers}
                loading={loadBestSellers || fetchBestSellers}
            />
        </div>
    );
}

export default Home;