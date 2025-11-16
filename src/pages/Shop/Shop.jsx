import "./Shop.scss";
import { useTranslation } from "react-i18next";
import { useProductsQuery, useSubCatigoriesQuery } from "../../redux/slice/productsSlice/productsSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import SmallLoad from "../../components/SmallLoad/SmallLoad";
import ReactPaginate from "react-paginate";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const Shop = () => {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const [subId, setSubId] = useState(null)
    const { data: categories, isLoading } = useSubCatigoriesQuery({ lang: i18n.language, id: id });
    const { data: products, isFetching } =
        useProductsQuery({ lang: i18n.language, catid: id, subid: subId });

    const itemsPerPage = 9;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        if (products?.data.length) {
            const firstItems = products?.data.slice(0, itemsPerPage);
            setCurrentItems(firstItems);
            setPageCount(Math.ceil(products?.data.length / itemsPerPage));
        } else {
            setCurrentItems([]);
            setPageCount(0);
        }
    }, [products?.data]);

    const handlePageClick = async (event) => {
        const newOffset = event.selected * itemsPerPage;
        setCurrentItems(products?.data.slice(newOffset, newOffset + itemsPerPage));
        scrollTo({
            top: 0
        })
    };

    return (
        <div className="shop">
            <div className="container">
                <div className="menu">
                    {isLoading ? <SmallLoad /> :
                        <ul>
                            <li>
                                <button
                                    onClick={() => setSubId(null)}
                                    className={`${!subId ? "active" : ""}`}
                                >الكل</button>
                            </li>
                            {categories?.data?.map((el) => (
                                <li key={el.id}>
                                    <button
                                        onClick={() => setSubId(el.id)}
                                        className={`${subId === el.id ? "active" : ""}`}
                                    >
                                        {el.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    }
                </div>

                <div className="products">
                    {isFetching ? <SmallLoad /> :
                        <>
                            {products && currentItems.length > 0 ?

                                <>
                                    <div className="all-products">
                                        {currentItems.map((el) => (
                                            <Product key={el.id} product={el} />
                                        ))}
                                    </div>
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel={i18n.language === "en" ? <ChevronsRight /> : <ChevronsLeft />}
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={2}
                                        pageCount={pageCount}
                                        previousLabel={i18n.language === "en" ? <ChevronsLeft /> : <ChevronsRight />}
                                        renderOnZeroPageCount={null}
                                        containerClassName={"pagination"}
                                        activeClassName={"active"}
                                    />
                                </>
                                :
                                <p>{t("no_result")}</p>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Shop;