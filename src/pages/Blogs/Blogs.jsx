import "./Blogs.scss";
import Blog from "../../components/Blog/Blog";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAllBlogsQuery } from "../../redux/slice/blogsSlice/blogsSlice";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { t } from "i18next";
import SmallLoad from "../../components/SmallLoad/SmallLoad";

const Blogs = () => {
    const { i18n } = useTranslation()
    const { data: blogs = [], isLoading } = useAllBlogsQuery(i18n.language);

    const itemsPerPage = 6;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        if (blogs?.data?.blogs.length) {
            const firstItems = blogs?.data?.blogs.slice(0, itemsPerPage);
            setCurrentItems(firstItems);
            setPageCount(Math.ceil(blogs?.data?.blogs.length / itemsPerPage));
        } else {
            setCurrentItems([]);
            setPageCount(0);
        }
    }, [blogs?.data?.blogs]);


    const handlePageClick = async (event) => {
        const newOffset = event.selected * itemsPerPage;
        setCurrentItems(blogs?.data?.blogs.slice(newOffset, newOffset + itemsPerPage));
        scrollTo({
            top: 0
        })
    };

    return (
        <div className="blogs">
            <h2 className="head-page ">{t("blogs")}</h2>

            {isLoading ? <SmallLoad /> :
                <div className="content">
                    {currentItems.length > 0 ?
                        <div className="container">
                            <div className="all-blogs">
                                {currentItems.map((el) => (
                                    <Blog
                                        key={el.id}
                                        blog={el}
                                    />
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
                        </div>
                        :
                        <p className="no-data">{t("no_result")}</p>
                    }
                </div>
            }
        </div>
    );
}

export default Blogs;