import "./CustomerService.scss";
import { useTranslation } from "react-i18next";
import { usePagesFooterQuery } from "../../../redux/slice/staticPagesSlice/staticPagesSlice";
import SmallLoad from "../../../components/SmallLoad/SmallLoad";

const CustomerService = () => {
    const { i18n } = useTranslation();
    const { data = [], isLoading } = usePagesFooterQuery(i18n.language);

    return (
        <div className="customer-service">
            {isLoading ? <SmallLoad /> :
                <div className="container">
                    <div className="content">
                        <div dangerouslySetInnerHTML={{ __html: data?.data?.[1]?.content }} className="desc" />
                    </div>
                    <div className="image">
                        <img
                            src={data?.data?.[1]?.image}
                            alt={data?.data?.[1]?.title}
                        />
                    </div>
                </div>
            }
        </div>
    );
}

export default CustomerService;