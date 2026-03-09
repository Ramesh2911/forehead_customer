import {
    useState,
    useEffect
}
    from "react";
import {
    FaStore,
    FaTicketAlt,
    FaClipboardList,
    FaHeadset,
    FaDice,
    FaMapMarkerAlt
}
    from "react-icons/fa";
import banner from "../assets/banner.jpeg"
import { useNavigate } from "react-router-dom";
import {
    getDrawsSchedule,
    getNearbyAllRetailers
}
    from "../services/auth.api";
import nearshop from "../assets/nearshop.png";
import ticket from "../assets/ticket.png";
import result from "../assets/result.png";
import draws from "../assets/draws.png";
import care from "../assets/care.png";

const Home = () => {

    const navigate = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [allRetailers, setAllRetailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const [drawList, setDrawList] = useState([]);
    const [showAllResults, setShowAllResults] = useState(false);

    const isMobile = screenWidth < 768;

    const getCompanyColor = (companyId) => {
        if (companyId === 1) return "linear-gradient(135deg,#22c55e,#16a34a)";
        if (companyId === 2) return "linear-gradient(135deg,#f97316,#ea580c)";
        if (companyId === 3) return "linear-gradient(135deg,#a855f7,#7e22ce)";
        return "#ccc";
    };

    const formatTime = (time) => {
        const [h, m] = time.split(":");
        let hour = parseInt(h);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${m} ${ampm}`;
    };

    useEffect(() => {
        fetchDraws();
        fetchAllRetailers();
    }, []);

    const fetchDraws = async () => {
        try {
            const res = await getDrawsSchedule();
            setDrawList(res.data.data || []);
        } catch (error) {
            console.error("Draw schedule fetch error", error);
        }
    };

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchAllRetailers = async () => {

        if (!navigator.geolocation) {
            toast.error("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                try {

                    const { data } = await getNearbyAllRetailers(latitude, longitude);

                    if (data.success) {
                        setAllRetailers(data.data);
                    }

                } catch (error) {
                    console.error("Retailer fetch error:", error);
                } finally {
                    setLoading(false);
                }
            },

            (error) => {
                console.error("Geolocation error:", error);
                toast.error("Unable to get location");
                setLoading(false);
            }

        );
    };

    return (
        <div style={{ padding: "15px", background: "#eef2ff" }}>
            <div
                style={{
                    display: "grid",
                    // gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gridTemplateColumns: isMobile
                        ? "repeat(2, 1fr)"
                        : "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "15px",
                    marginBottom: "20px",
                }}
            >
                {[
                    {
                        icon: (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%"
                            }}>
                                <img
                                    src={nearshop}
                                    alt="Nearby Shops"
                                    style={{
                                        width: isMobile ? "70px" : "120px",
                                        height: isMobile ? "70px" : "120px",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                        ),
                        title: "Nearby Shops",
                        subtitle: "Find shops near you",
                        path: "/type-retailers?type=nearby",
                        gradient: "linear-gradient(135deg, #93c5fd, #60a5fa)",
                    },
                    {
                        icon: (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%"
                            }}>
                                <img
                                    src={ticket}
                                    alt="Lottery Tickets"
                                    style={{
                                        width: isMobile ? "70px" : "120px",
                                        height: isMobile ? "70px" : "120px",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                        ),
                        title: "Lottery Tickets",
                        subtitle: "Buy tickets easily",
                        path: "/ticket",
                        gradient: "linear-gradient(135deg, #86efac, #4ade80)",
                    },
                    {
                        icon: (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%"
                            }}>
                                <img
                                    src={result}
                                    alt="Lottery Results"
                                    style={{
                                        width: isMobile ? "70px" : "120px",
                                        height: isMobile ? "70px" : "120px",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                        ),
                        title: "Results",
                        subtitle: "Check latest results",
                        path: "/results",
                        gradient: "linear-gradient(135deg, #fde68a, #fbbf24)",
                    },
                    {
                        icon: (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%"
                            }}>
                                <img
                                    src={draws}
                                    alt="Lottery Draws"
                                    style={{
                                        width: isMobile ? "70px" : "120px",
                                        height: isMobile ? "70px" : "120px",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                        ),
                        title: "Draws",
                        subtitle: "Start new draw",
                        path: "/draws",
                        gradient: "linear-gradient(135deg, #fca5a5, #f87171)",
                    },
                    {
                        icon: (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%"
                            }}>
                                <img
                                    src={care}
                                    alt="Customer Care"
                                    style={{
                                        width: isMobile ? "70px" : "120px",
                                        height: isMobile ? "70px" : "120px",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                        ),
                        title: "Support",
                        path: "/support",
                        subtitle: "24/7 customer help",
                        gradient: "linear-gradient(135deg, #bfdbfe, #93c5fd)",
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        style={{
                            background: item.gradient,
                            borderRadius: "22px",
                            // padding: "25px 15px",
                            padding: isMobile ? "15px 10px" : "25px 15px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            position: "relative",
                            overflow: "hidden",
                        }}
                        onClick={() => {
                            if (item.path) {
                                navigate(item.path);
                            }
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "translateY(-6px)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "translateY(0)")
                        }
                    >
                        {/* Soft white overlay for screenshot feel */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: "-30px",
                                left: 0,
                                right: 0,
                                height: "80px",
                                background: "rgba(255,255,255,0.35)",
                                borderTopLeftRadius: "50%",
                                borderTopRightRadius: "50%",
                            }}
                        />

                        {/* Large Icon */}
                        <div
                            style={{
                                fontSize: "60px",
                                color: "#ffffff",
                                marginBottom: "15px",
                            }}
                        >
                            {item.icon}
                        </div>

                        {/* Title Only */}
                        <h4
                            style={{
                                margin: 0,
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "#1f2937",
                            }}
                        >
                            {item.title}
                        </h4>
                    </div>
                ))}
            </div>

            <div
                style={{
                    background: "#f3f4f6",
                    borderRadius: "16px",
                    padding: "20px",
                    marginBottom: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <h4
                        style={{
                            margin: 0,
                            fontWeight: "700",
                            fontSize: isMobile ? "15px" : "18px",
                            background: "linear-gradient(90deg, #1e40af, #dc2626)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Today's Lottery Results
                    </h4>

                    <button
                        onClick={() => setShowAllResults(!showAllResults)}
                        style={{
                            background: "linear-gradient(90deg, #1e40af, #dc2626)",
                            color: "#fff",
                            border: "none",
                            padding: "8px 14px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                    >
                        {showAllResults ? "Hide" : "View All"}
                    </button>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {(showAllResults ? drawList : drawList.slice(0, 4)).map((draw) => (
                        <div
                            key={draw.id}
                            style={{
                                background: getCompanyColor(draw.company_id),
                                color: "#fff",
                                padding: isMobile ? "16px 10px" : "30px 20px",
                                borderRadius: "14px",
                                textAlign: "center",
                                transition: "0.3s",
                            }}
                        >
                            <h5 style={{ margin: "10px 0", fontSize: "18px" }}>
                                {draw.name}
                            </h5>

                            <p style={{ margin: 0, fontSize: isMobile ? "13px" : "15px" }}>
                                {formatTime(draw.time)} Result
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div
                style={{
                    background: "#f1f5f9",
                    padding: "30px 15px",
                }}
            >
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <h4
                            style={{
                                margin: 0,
                                fontWeight: "700",
                                fontSize: "18px",
                                background: "linear-gradient(90deg, #1e40af, #dc2626)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Featured Shops Near You
                        </h4>
                        <button
                            onClick={() => setShowAll(!showAll)}
                            style={{
                                background: "linear-gradient(90deg, #1e40af, #dc2626)",
                                color: "#fff",
                                border: "none",
                                padding: "8px 14px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                        >
                            {showAll ? "Hide" : "View All"}
                        </button>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: isMobile ? "10px" : "20px",
                        }}
                    >
                        {(showAll ? allRetailers : allRetailers.slice(0, 2)).map((shop, index) => (
                            <div
                                key={index}
                                style={{
                                    background: "#f9fafb",
                                    padding: "18px",
                                    borderRadius: isMobile ? "10px" : "14px",
                                    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "15px",
                                        alignItems: "center",
                                        marginBottom: "15px",
                                    }}
                                >
                                    <img
                                        src={shop.shop_img || banner}
                                        alt="shop"
                                        style={{
                                            width: "90px",
                                            height: "70px",
                                            borderRadius: "8px",
                                            objectFit: "cover",
                                        }}
                                    />

                                    <div>
                                        <h4 style={{ margin: "0 0 6px 0" }}>
                                            {shop.shop_name}
                                        </h4>

                                        <p
                                            style={{
                                                margin: 0,
                                                color: "#64748b",
                                                fontSize: "14px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                            }}
                                        >
                                            <FaMapMarkerAlt style={{ color: "#dc2626", fontSize: "14px" }} />
                                            {shop.address} - {Number(shop?.distance ?? 0).toFixed(2)} km away
                                        </p>
                                    </div>
                                </div>

                                <button
                                    style={{
                                        width: "100%",
                                        background: "linear-gradient(90deg, #1e40af, #dc2626)",
                                        color: "#fff",
                                        border: "none",
                                        padding: "10px",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                    }}
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;