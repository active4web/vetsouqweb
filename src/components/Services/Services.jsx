import "./Services.scss";
import SmallLoad from "../SmallLoad/SmallLoad";

const Services = ({ data, loading }) => {
    const url = import.meta.env.VITE_URL_API

    return (
        <div className="services-component">
            {loading ? <SmallLoad /> :
                <div className="container">
                    {data.data.details.map((el, id) => (
                        <div className="service" key={id}>
                            <img
                                src={`${url}/${el.image}`}
                                alt={el.title}
                                loading="lazy"
                                width={60}
                                height={60}
                            />

                            <div className="content">
                                <h4>{el.title}</h4>
                                <p>{el.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default Services;