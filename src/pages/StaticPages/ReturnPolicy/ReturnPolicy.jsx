import "./ReturnPolicy.scss";
import { useTranslation } from "react-i18next";
import { useStaticPagesQuery } from "../../../redux/slice/staticPagesSlice/staticPagesSlice";
import SmallLoad from "../../../components/SmallLoad/SmallLoad";

const ReturnPolicy = () => {
    const { i18n } = useTranslation();
    const { data = [], isLoading } = useStaticPagesQuery({
        lang: i18n.language,
        id: 18,
    });

    return (
        <div className="return-policy">
            {isLoading ? <SmallLoad /> :
                <div className="container">
                    <div className="content">
                        <div dangerouslySetInnerHTML={{ __html: data?.data?.[0]?.content }} className="desc" />
                    </div>
                    <div className="image">
                        <img
                            src={data?.data?.[0]?.image}
                            alt={data?.data?.[0]?.title}
                        />
                    </div>
                </div>
            }
        </div>
    );
}

export default ReturnPolicy;