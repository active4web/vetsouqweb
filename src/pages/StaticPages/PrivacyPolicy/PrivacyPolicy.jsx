import "./PrivacyPolicy.scss";
import { useTranslation } from "react-i18next";
import { useStaticPagesQuery } from "../../../redux/slice/staticPagesSlice/staticPagesSlice";

const PrivacyPolicy = () => {
    const { i18n } = useTranslation();
    const { data = [] } = useStaticPagesQuery({
        lang: i18n.language,
        id: 10,
    });

    return (
        <div className="privacy-policy">
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
        </div>
    );
}

export default PrivacyPolicy;