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

const Home = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = screenWidth < 768;

    return (
        <div style={{ padding: "15px", background: "#eef2ff" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "15px",
                    marginBottom: "20px",
                }}
            >
                {[
                    {
                        icon: <FaStore size={28} />,
                        title: "Nearby Shops",
                        subtitle: "Find shops near you",
                        gradient: "linear-gradient(135deg, #4ade80, #16a34a)",
                    },
                    {
                        icon: <FaTicketAlt size={28} />,
                        title: "Lottery Tickets",
                        subtitle: "Buy tickets easily",
                        gradient: "linear-gradient(135deg, #facc15, #f97316)",
                    },
                    {
                        icon: <FaClipboardList size={28} />,
                        title: "Results",
                        subtitle: "Check latest results",
                        gradient: "linear-gradient(135deg, #60a5fa, #2563eb)",
                    },
                    {
                        icon: <FaDice size={28} />,
                        title: "Draws",
                        subtitle: "Start new draw",
                        gradient: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                    },
                    {
                        icon: <FaHeadset size={28} />,
                        title: "Support",
                        subtitle: "24/7 customer help",
                        gradient: "linear-gradient(135deg, #fb7185, #e11d48)",
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        style={{
                            background: item.gradient,
                            borderRadius: "16px",
                            padding: "16px",
                            boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
                            color: "#fff",
                            cursor: "pointer",
                            transition: "0.3s",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "translateY(-5px)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "translateY(0)")
                        }
                    >
                        <div
                            style={{
                                background: "rgba(255,255,255,0.2)",
                                width: "45px",
                                height: "45px",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "10px",
                            }}
                        >
                            {item.icon}
                        </div>

                        <h4
                            style={{
                                margin: 0,
                                fontSize: "16px",
                                fontWeight: 600,
                            }}
                        >
                            {item.title}
                        </h4>

                        <p
                            style={{
                                margin: 0,
                                fontSize: "12px",
                                opacity: 0.9,
                            }}
                        >
                            {item.subtitle}
                        </p>
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
                            fontSize: "18px",
                            background: "linear-gradient(90deg, #1e40af, #dc2626)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Today's Lottery Results
                    </h4>
                    <button
                        style={{
                            background: "#2563eb",
                            color: "#fff",
                            border: "none",
                            padding: "8px 14px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                    >
                        View All
                    </button>
                </div>

                {/* Responsive Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {["Dear Lottery", "Bangasree Lottery", "Lagna Lakshmi"].map(
                        (item, index) => (
                            <div
                                key={index}
                                style={{
                                    background: "linear-gradient(135deg,#f97316,#ea580c)",
                                    color: "#fff",
                                    padding: "30px 20px",
                                    borderRadius: "14px",
                                    textAlign: "center",
                                    transition: "0.3s",
                                }}
                            >
                                <h5 style={{ margin: "10px 0", fontSize: "18px" }}>
                                    {item}
                                </h5>
                                <p style={{ margin: 0, fontSize: "15px" }}>
                                    11:30 AM Result
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div
                style={{
                    background: "#f1f5f9",
                    padding: "30px 15px",
                }}
            >
                <div>
                    <h4
                        style={{
                            marginBottom: "20px",
                            fontWeight: "700",
                            background: "linear-gradient(90deg, #1e40af, #dc2626)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Featured Shops Near You
                    </h4>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "20px",
                        }}
                    >
                        {[
                            {
                                name: "Lucky Lottery Centre",
                                location: "Sodepur, Kolkata",
                            },
                            {
                                name: "Mitra Agency",
                                location: "Ultadanga, Kolkata",
                            },
                        ].map((shop, index) => (
                            <div
                                key={index}
                                style={{
                                    background: "#f9fafb",
                                    padding: "18px",
                                    borderRadius: "14px",
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
                                        src={banner}
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
                                            {shop.name}
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
                                            {shop.location}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        flexWrap: "wrap",
                                        marginBottom: "15px",
                                    }}
                                >
                                    <span
                                        style={{
                                            background: "#fde68a",
                                            padding: "5px 10px",
                                            borderRadius: "20px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Tickets Available
                                    </span>

                                    <span
                                        style={{
                                            background: "#dcfce7",
                                            color: "#16a34a",
                                            padding: "5px 10px",
                                            borderRadius: "20px",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        ● Open Now
                                    </span>
                                </div>

                                <button
                                    style={{
                                        width: "100%",
                                        background: "#f97316",
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