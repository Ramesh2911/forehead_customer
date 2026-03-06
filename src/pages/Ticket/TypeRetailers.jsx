import {
    useEffect,
    useState
}
    from "react";
import {
    getAllCompanies,
    getNearbyRetailers,
    followRetailer,
    customerFollowRetailers
}
    from "../../services/auth.api";
import { toast } from "react-toastify";
import banner from "../../assets/banner.jpeg";
import {
    FaHeart,
    FaRegHeart
}
    from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const TypeRetailers = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const [searchParams] = useSearchParams();
    const pageType = searchParams.get("type");
    const [companies, setCompanies] = useState([]);
    const [retailers, setRetailers] = useState([]);
    const [favorites, setFavorites] = useState({});

    useEffect(() => {
        fetchCompanies();
    }, []);

    useEffect(() => {
        if (pageType === "follow") {
            loadFollowRetailers();
        }
    }, [pageType]);

    const fetchCompanies = async () => {
        try {

            const { data } = await getAllCompanies();

            if (data.success) {
                setCompanies(data.data);
            }

        } catch (error) {
            console.error("Company fetch error:", error);
        }
    };

    const loadFollowRetailers = async () => {

        try {
            const { data } = await customerFollowRetailers(user.id);

            if (data.success) {

                const favObj = {};

                data.data.forEach(item => {
                    favObj[item.retailer_id] = true;
                });

                setFavorites(favObj);

            }

        } catch (error) {
            console.error(error);
        }

    };

    const handleCompanyClick = (companyId) => {

        if (!navigator.geolocation) {
            toast.error("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                try {

                    const { data } = await getNearbyRetailers(
                        companyId,
                        latitude,
                        longitude
                    );

                    if (data.success && data.data.length > 0) {
                        setRetailers(data.data);
                    }

                } catch (error) {
                    console.error("Retailer fetch error:", error);
                }

            },

            () => {
                toast.error("Please enable location to find nearby retailers");
            }

        );

    };

    const handleFollow = async (retailerId) => {
        try {

            const payload = {
                customer_id: user.id,
                retailer_id: retailerId
            };

            const { data } = await followRetailer(payload);

            if (data.success) {

                setFavorites(prev => ({
                    ...prev,
                    [retailerId]: data.is_follow === 1
                }));

            }

        } catch (error) {
            console.error("Follow error:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h3 style={{ marginBottom: "20px", fontWeight: "600" }}>
                Choice Company
            </h3>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px"
                }}
            >
                {companies.map((company) => (

                    <div
                        key={company.id}
                        onClick={() => handleCompanyClick(company.id)}
                        style={{
                            padding: "10px 18px",
                            borderRadius: "25px",
                            background: "linear-gradient(90deg, #1e40af, #dc2626)",
                            color: "#fff",
                            fontWeight: "500",
                            cursor: "pointer",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            transition: "0.2s"
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                        }
                    >
                        {company.name}
                    </div>
                ))}
            </div>

            {retailers && retailers.length > 0 && (
                <div style={{ marginTop: "30px" }}>

                    <h3 style={{ marginBottom: "16px", fontWeight: "600" }}>
                        Nearby Retailers
                    </h3>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "16px"
                        }}
                    >

                        {retailers.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    background: "#fff",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                    cursor: "pointer",
                                    transition: "0.25s",
                                    width: "100%"
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform = "translateY(-6px)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform = "translateY(0)")
                                }
                            >

                                <div style={{ position: "relative" }}>
                                    <img
                                        src={item.shop_img || banner}
                                        alt={item.shop_name}
                                        style={{
                                            width: "100%",
                                            height: "180px",
                                            objectFit: "cover"
                                        }}
                                    />
                                    {pageType === "follow" && (
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFollow(item.id);
                                            }}
                                            style={{
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px",
                                                background: "#fff",
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {favorites[item.id] ? (
                                                <FaHeart color="#ef4444" size={16} />
                                            ) : (
                                                <FaRegHeart color="#6b7280" size={16} />
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div style={{ padding: "14px" }}>

                                    <div
                                        style={{
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            marginBottom: "6px"
                                        }}
                                    >
                                        {item.shop_name}
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "13px",
                                            color: "#6b7280",
                                            marginBottom: "6px"
                                        }}
                                    >
                                        {item.address || "Address not available"}
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "13px",
                                            fontWeight: "500",
                                            color: "#2563eb"
                                        }}
                                    >
                                        📍 {item.distance.toFixed(2)} km away
                                    </div>

                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypeRetailers;