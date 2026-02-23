import { useState } from "react";
import {
    FaBookmark,
    FaHistory,
    FaListAlt,
    FaTags,
    FaSyncAlt,
    FaArrowRight,
    FaEquals,
    FaHashtag,
    FaTrophy,
} from "react-icons/fa";

const Ticket = () => {

    const cardStyle = {
        background: "#f3f4f6",
        borderRadius: "18px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
        padding: "25px",
        margin: "30px auto",
        width: "95%",
        maxWidth: "1200px",
    };

    const DashboardCard = ({ title, subtitle, gradient, Icon, onClick }) => {
        return (
            <div
                onClick={onClick}
                style={{
                    borderRadius: "18px",
                    padding: "16px 18px",
                    background: gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    transition: "0.3s"
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                }
            >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>

                    <div
                        style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#111827"
                        }}
                    >
                        <Icon size={20} />
                    </div>

                    <div>
                        <div style={{ fontWeight: "600", fontSize: "15px" }}>
                            {title}
                        </div>
                        <div style={{ fontSize: "12px", opacity: 0.9 }}>
                            {subtitle}
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    ➜
                </div>
            </div>
        );
    };

    return (
        <>
            <div style={cardStyle}>
                <div
                    style={{
                        fontWeight: "700",
                        fontSize: "18px",
                        marginBottom: "14px",
                        background: "linear-gradient(90deg, #1e40af, #dc2626)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                    }}
                >
                    Ticket Details
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "14px"
                    }}
                >

                    <DashboardCard
                        title="My Follow Retailers"
                        subtitle="View Followed Shops"
                        gradient="linear-gradient(135deg, #3b82f6, #1e40af)"
                        Icon={FaBookmark}
                    />

                    <DashboardCard
                        title="My Ticket History"
                        subtitle="View Past Tickets"
                        gradient="linear-gradient(135deg, #ef4444, #dc2626)"
                        Icon={FaHistory}
                    />

                    <DashboardCard
                        title="My Put Result List"
                        subtitle="Check Uploaded Results"
                        gradient="linear-gradient(135deg, #22c55e, #16a34a)"
                        Icon={FaListAlt}
                    />

                    <DashboardCard
                        title="Ticket Type Retailers"
                        subtitle="Browse By Ticket Type"
                        gradient="linear-gradient(135deg, #fbbf24, #f59e0b)"
                        Icon={FaTags}
                    />
                </div>
            </div>

            <div style={cardStyle}>
                <div
                    style={{
                        fontWeight: "700",
                        fontSize: "18px",
                        marginBottom: "14px",
                        background: "linear-gradient(90deg, #1e40af, #dc2626)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                    }}
                >
                    Ticket Search
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "14px"
                    }}
                >

                    <DashboardCard
                        title="1st Prize Ticket No."
                        subtitle="Top Winning Number"
                        gradient="linear-gradient(135deg, #fde047, #facc15)"
                        Icon={FaTrophy}
                    />

                    <DashboardCard
                        title="4 Digit Ticket No."
                        subtitle="Exact 4 Digit Match"
                        gradient="linear-gradient(135deg, #d1d5db, #9ca3af)"
                        Icon={FaHashtag}
                    />

                    <DashboardCard
                        title="Middle 2 Digit Ticket No."
                        subtitle="Middle Number Match"
                        gradient="linear-gradient(135deg, #d97706, #b45309)"
                        Icon={FaEquals}
                    />

                    <DashboardCard
                        title="Last 2 Digit Ticket No."
                        subtitle="Ending Number Match"
                        gradient="linear-gradient(135deg, #a855f7, #7c3aed)"
                        Icon={FaArrowRight}
                    />

                    <DashboardCard
                        title="Most Repeat Ticket No."
                        subtitle="Most Frequently Drawn"
                        gradient="linear-gradient(135deg, #4ade80, #22c55e)"
                        Icon={FaSyncAlt}
                    />
                </div>
            </div>
        </>
    );
};

export default Ticket;