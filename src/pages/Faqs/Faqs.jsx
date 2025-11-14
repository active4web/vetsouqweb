import "./Faqs.scss";
import { useFaqsQuery } from "../../redux/slice/staticPagesSlice/staticPagesSlice";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SmallLoad from "../../components/SmallLoad/SmallLoad";

const Faqs = () => {
    const [textSearch, setTextSearch] = useState("")
    const { t, i18n } = useTranslation();
    const { data = [], isFetching } = useFaqsQuery({
        lang: i18n.language,
        search: textSearch
    });
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faqs">
            <div className="container">
                <h2>{t("faqs")}</h2>

                <div className="search">
                    <input
                        type="text"
                        placeholder={t("search_faqs")}
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                </div>

                {isFetching ? <SmallLoad /> :
                    <>
                        {data?.data?.questions_list.length > 0 ?
                            <div className="all-questions">
                                {data?.data?.questions_list.map((el) => (
                                    <div key={el.id} className="accordion-item">
                                        <button
                                            className={`accordion-header ${activeIndex === el.id ? "active" : ""}`}
                                            onClick={() => toggleAccordion(el.id)}
                                        >
                                            {el.name} <ChevronDown />
                                        </button>
                                        <div className={`accordion-content ${activeIndex === el.id ? "open" : ""}`}>
                                            <div dangerouslySetInnerHTML={{ __html: el.answerweb }} className="desc" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            :
                            <p className="no-result">{t("no_result")}</p>
                        }
                    </>
                }
            </div>
        </div>
    );
}

export default Faqs;