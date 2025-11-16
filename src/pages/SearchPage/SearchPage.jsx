import "./SearchPage.scss"
import { useSearchProductsQuery } from "../../redux/slice/productsSlice/productsSlice";
import { useTranslation } from "react-i18next";
import Product from "../../components/Product/Product";
import SmallLoad from "../../components/SmallLoad/SmallLoad";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const SearchPage = () => {
    const { t, i18n } = useTranslation();
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get("s");
    const { data = [], isLoading } = useSearchProductsQuery({
        lang: i18n.language,
        text: searchValue
    }, { skip: !searchValue });

    const itemsPerPage = 8;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        if (data?.data?.length) {
            const firstItems = data?.data?.slice(0, itemsPerPage);
            setCurrentItems(firstItems);
            setPageCount(Math.ceil(data?.data?.length / itemsPerPage));
        } else {
            setCurrentItems([]);
            setPageCount(0);
        }
    }, [data?.data]);

    const handlePageClick = async (event) => {
        const newOffset = event.selected * itemsPerPage;
        setCurrentItems(data?.data?.slice(newOffset, newOffset + itemsPerPage));
        scrollTo({
            top: 0
        })
    };

    return (
        <div className="search-page">
            {isLoading ?
                <SmallLoad /> :
                <>
                    <h2>{t("search_results")}</h2>

                    {data && currentItems.length > 0 ?
                        <>
                            <div className="products">
                                {currentItems.map(el => (
                                    <Product product={el} key={el.id} />
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
                        <p className="no-data">{t("no_result")}</p>
                    }
                </>
            }
        </div>
    );
}

export default SearchPage;