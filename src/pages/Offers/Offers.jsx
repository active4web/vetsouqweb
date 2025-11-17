import "./Offers.scss";
import { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import ReactPaginate from "react-paginate";
import { useAllCatigoriesQuery, useProductOffersQuery } from "../../redux/slice/productsSlice/productsSlice";
import { useTranslation } from "react-i18next";
import SmallLoad from "../../components/SmallLoad/SmallLoad";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Offers = () => {
    const [textSearch, setTextSearch] = useState("");
    const { t, i18n } = useTranslation();
    const [categoryId, setCategoryId] = useState("")
    const { data = [], isFetching } = useProductOffersQuery({
        lang: i18n.language,
        search: textSearch,
        category_id: categoryId
    });
    const { data: categories = {} } = useAllCatigoriesQuery({ lang: i18n.language });

    const itemsPerPage = 9;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const [filter, setFilter] = useState("");

    const getFilteredData = () => {
        if (!data?.data) return [];

        let filtered = [...data.data];

        switch (filter) {
            case "highest_price":
                filtered.sort((a, b) => b.current_price - a.current_price);
                break;
            case "low_price":
                filtered.sort((a, b) => a.current_price - b.current_price);
                break;
            case "recently_added":
                filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case "top_reviews":
                filtered.sort((a, b) => b.reviews_count - a.reviews_count);
                break;
            default:
                break;
        }

        return filtered;
    };

    useEffect(() => {
        const filteredData = getFilteredData();
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filteredData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredData.length / itemsPerPage));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, filter, itemOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % getFilteredData().length;
        setItemOffset(newOffset);
        scrollTo({ top: 0 });
    };

    return (
        <div className="offers">
            <h3>{t("best_offer")}</h3>

            <div className="search">
                <input
                    type="text"
                    placeholder={t("search_offers")}
                    onChange={(e) => setTextSearch(e.target.value)}
                />
            </div>

            <div className="main-content">
                <div className="content">
                    <aside>
                        {categories?.data?.map(el => (
                            <div className="category" key={el.id}>
                                <input
                                    type="checkbox"
                                    id={el.id}
                                    name={`category-${el.id}`}
                                    checked={categoryId === el.id}
                                    onChange={() => setCategoryId(el.id)}
                                />
                                <label htmlFor={el.id}>{el.name}</label>
                            </div>
                        ))}

                        <hr />

                        <div className="top-price">
                            <input
                                type="checkbox"
                                id="id21"
                                name="filter"
                                value="highest_price"
                                checked={filter === "highest_price"}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            <label htmlFor="id21">{t("top_price")}</label>
                        </div>

                        <div className="top-price">
                            <input
                                type="checkbox"
                                id="id22"
                                name="filter"
                                value="low_price"
                                checked={filter === "low_price"}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            <label htmlFor="id22">{t("low_price")}</label>
                        </div>

                        <div className="newly-added">
                            <input
                                type="checkbox"
                                id="id23"
                                name="filter"
                                value="recently_added"
                                checked={filter === "recently_added"}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            <label htmlFor="id23">{t("new_products")}</label>
                        </div>

                        <div className="top-rated">
                            <input
                                type="checkbox"
                                id="id24"
                                name="filter"
                                value="top_reviews"
                                checked={filter === "top_reviews"}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            <label htmlFor="id24">{t("top_rated")}</label>
                        </div>
                    </aside>

                    {isFetching ? (
                        <SmallLoad />
                    ) : (
                        <>
                            {currentItems.length > 0 ? (
                                <div>
                                    <div className="all-products">
                                        {currentItems.map((el, id) => (
                                            <Product
                                                key={id}
                                                product={el}
                                                catid={el.category_id}
                                            />
                                        ))}
                                    </div>

                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel={
                                            i18n.language === "en" ? (
                                                <ChevronRight />
                                            ) : (
                                                <ChevronLeft />
                                            )
                                        }
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={2}
                                        pageCount={pageCount}
                                        previousLabel={
                                            i18n.language === "en" ? (
                                                <ChevronLeft />
                                            ) : (
                                                <ChevronRight />
                                            )
                                        }
                                        renderOnZeroPageCount={null}
                                        containerClassName={"pagination"}
                                        activeClassName={"active"}
                                    />
                                </div>
                            ) : (
                                <p className="no-result">{t("no_result")}</p>
                            )
                            }
                        </>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Offers;
