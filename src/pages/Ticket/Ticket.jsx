import { useState } from "react";
import {
    FaSearch,
    FaStore,
    FaHistory,
    FaListAlt,
    FaTags,
} from "react-icons/fa";

const Ticket = () => {

    const [searchValue, setSearchValue] = useState("");

    const detailsItems = [
        {
            title: "My Follow Retailers",
            icon: <FaStore size={20} />,
        },
        {
            title: "My Ticket History",
            icon: <FaHistory size={20} />,
        },
        {
            title: "My Put Result List",
            icon: <FaListAlt size={20} />,
        },
        {
            title: "Ticket Type Retailers",
            icon: <FaTags size={20} />,
        },
    ];

    return (
        <div style={{ padding: "30px 15px", background: "#f8fafc" }}>
            <h3
                style={{
                    marginBottom: "25px",
                    fontWeight: "700",
                    background: "linear-gradient(90deg, #1e40af, #dc2626)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                }}
            >
                Ticket Details
            </h3>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                    gap: "20px",
                    marginBottom: "50px",
                }}
            >
                {detailsItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #e5e7eb",
                            borderRadius: "18px",
                            padding: "20px",
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            background: "linear-gradient(135deg, #1e40af, #dc2626)",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
                            color: "#fff", 
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "translateY(-4px)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "translateY(0)")
                        }
                    >
                        <div
                            style={{
                                width: "45px",
                                height: "45px",
                                borderRadius: "12px",
                                background: "#1e40af",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                            }}
                        >
                            {item.icon}
                        </div>

                        <span
                            style={{
                                fontWeight: "600",
                                fontSize: "15px",
                                color: "#111827",
                            }}
                        >
                            {item.title}
                        </span>
                    </div>
                ))}
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "500px",
                    }}
                >
                    <FaSearch
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "15px",
                            transform: "translateY(-50%)",
                            color: "#6b7280",
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Enter Ticket Number..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "14px 15px 14px 40px",
                            borderRadius: "30px",
                            border: "1px solid #e5e7eb",
                            outline: "none",
                            fontSize: "15px",
                            boxShadow: "0 3px 8px rgba(0,0,0,0.04)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Ticket;