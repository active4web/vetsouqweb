import "./DistinctiveSections.scss";
import { Link } from "react-router-dom";
import { MoveLeft, MoveRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const DistinctiveSections = () => {
    const { i18n } = useTranslation();

    return (
        <div className="distinctive-sections">
            <div className="container">
                <h2 className="head-section">اقسام مميزة</h2>

                <div className="categories">
                    <div className="category">
                        <div className="content">
                            <h3>كنوز مرحة لأطفال سعداء</h3>
                            <p>حيث تثير كل لعبة الإبداع وتجلب كل زي الابتسامات</p>
                            <Link>
                                <span>شاهد المزيد</span>
                                <span>
                                    {i18n.language === "ar" ? <MoveLeft /> : <MoveRight />}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="content">
                            <h3>كنوز مرحة لأطفال سعداء</h3>
                            <p>حيث تثير كل لعبة الإبداع وتجلب كل زي الابتسامات</p>
                            <Link>
                                <span>شاهد المزيد</span>
                                <span>
                                    {i18n.language === "ar" ? <MoveLeft /> : <MoveRight />}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="content">
                            <h3>كنوز مرحة لأطفال سعداء</h3>
                            <p>حيث تثير كل لعبة الإبداع وتجلب كل زي الابتسامات</p>
                            <Link>
                                <span>شاهد المزيد</span>
                                <span>
                                    {i18n.language === "ar" ? <MoveLeft /> : <MoveRight />}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DistinctiveSections;