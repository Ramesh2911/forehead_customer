import {
    Modal,
    Button,
    Form,
    Row,
    Col
}
    from "react-bootstrap";
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
    FaCalendarAlt,
    FaSearch,
    FaInfoCircle
} from "react-icons/fa";
import {
    getAllCompanies,
    getFirstPrizeListByCompany
}
    from "../../services/auth.api";
import { useState } from "react";
import DataTable from "react-data-table-component";

const Ticket = () => {

    const [showSearchModal, setShowSearchModal] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [searchType, setSearchType] = useState("");
    const [firstPrizeData, setFirstPrizeData] = useState([]);
    const [firstPrizeLoading, setFirstPrizeLoading] = useState(false);
    const [showTableModal, setShowTableModal] = useState(false);
    

    const fetchCompanies = async () => {
        try {
            const res = await getAllCompanies();
            if (res.data.success) {
                setCompanies(res.data.data);
            }
        } catch (error) {
            console.error("Company fetch error", error);
        }
    };

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

    const handleSearchCardClick = (type) => {
        setSearchType(type);
        fetchCompanies();
        setShowSearchModal(true);
    };

    const handleCompanyChange = async (companyId) => {
        setSelectedCompany(companyId);
        setFirstPrizeLoading(true);

        try {
            const res = await getFirstPrizeListByCompany(companyId);

            if (res.data.success) {
                setFirstPrizeData(res.data.data || []);
            } else {
                setFirstPrizeData([]);
            }

            // Close small modal
            setShowSearchModal(false);

            // Open table modal
            setShowTableModal(true);

        } catch (error) {
            console.error("Fetch first prize error:", error);
            setFirstPrizeData([]);
            setShowSearchModal(false);
            setShowTableModal(true);
        } finally {
            setFirstPrizeLoading(false);
        }
    };

    const firstPrizeColumns = [
        {
            name: "Date",
            selector: row => new Date(row.ticket_date).toLocaleDateString("en-GB"),
            sortable: true
        },
        {
            name: "Ticket No",
            selector: row => row.ticket_no,
            sortable: true
        },
        {
            name: "Time",
            cell: row => {
                const hour = parseInt(row.ticket_time?.split(":")[0]);

                let label = "-";
                let color = "#6b7280";

                if (hour >= 5 && hour < 12) {
                    label = "Mrng";
                    color = "#3b82f6";
                }
                else if (hour >= 12 && hour < 17) {
                    label = "Day";
                    color = "#f59e0b";
                }
                else if (hour >= 17 && hour <= 23) {
                    label = "Eve";
                    color = "#8b5cf6";
                }

                const tooltipText = `
Ticket No: ${row.ticket_no}
Prize Type: ${row.prize_type}
Amount: ₹ ${Number(row.amount).toLocaleString()}
Date: ${new Date(row.ticket_date).toLocaleDateString("en-GB")}
Time: ${row.ticket_time}
Status: ${row.is_sold === 1 ? "Sold" : "Unsold"}
        `;

                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: color
                        }}>
                            {label}
                        </span>
                        <span
                            title={tooltipText}
                            style={{
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                backgroundColor: color,
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                fontWeight: 700,
                                cursor: "pointer"
                            }}
                        >
                            i
                        </span>
                    </div>
                );
            },
            sortable: true
        }
    ];

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
                        onClick={() => handleSearchCardClick("1st")}
                    />

                    <DashboardCard
                        title="4 Digit Ticket No."
                        subtitle="Exact 4 Digit Match"
                        gradient="linear-gradient(135deg, #7d6891, #d614d6)"
                        Icon={FaHashtag}
                        onClick={() => handleSearchCardClick("4digit")}
                    />

                    <DashboardCard
                        title="Middle 2 Digit Ticket No."
                        subtitle="Middle Number Match"
                        gradient="linear-gradient(135deg, #d97706, #b45309)"
                        Icon={FaEquals}
                        onClick={() => handleSearchCardClick("middle2")}
                    />

                    <DashboardCard
                        title="Last 2 Digit Ticket No."
                        subtitle="Ending Number Match"
                        gradient="linear-gradient(135deg, #a855f7, #7c3aed)"
                        Icon={FaArrowRight}
                        onClick={() => handleSearchCardClick("last2")}
                    />

                    <DashboardCard
                        title="Most Repeat Ticket No."
                        subtitle="Most Frequently Drawn"
                        gradient="linear-gradient(135deg, #4ade80, #22c55e)"
                        Icon={FaSyncAlt}
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
                    Bumper
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "14px"
                    }}
                >

                    <DashboardCard
                        title="Bumper Draw"
                        subtitle="View Upcoming Bumper Draw"
                        gradient="linear-gradient(135deg, #2563eb, #1e3a8a)"
                        Icon={FaCalendarAlt}
                    />

                    <DashboardCard
                        title="Bumper Result"
                        subtitle="Check Bumper Draw Results"
                        gradient="linear-gradient(135deg, #facc15, #f59e0b)"
                        Icon={FaTrophy}
                    />

                    <DashboardCard
                        title="Bumper Ticket No Check"
                        subtitle="Verify Your Ticket Number"
                        gradient="linear-gradient(135deg, #10b981, #047857)"
                        Icon={FaSearch}
                    />

                    <DashboardCard
                        title="Bumper Winning Record"
                        subtitle="View Past Winning Records"
                        gradient="linear-gradient(135deg, #7c3aed, #4c1d95)"
                        Icon={FaHistory}
                    />
                </div>
            </div>

            <Modal
                show={showSearchModal}
                onHide={() => setShowSearchModal(false)}
                centered
                size="sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontWeight: 600 }}>
                        <span style={{ color: "#2563eb" }}>
                            {searchType}
                        </span>{" "}
                        <span style={{ color: "#ef4444" }}>
                            Ticket Search
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4 py-3">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 500 }}>
                                Select Company
                            </Form.Label>

                            <Form.Select
                                value={selectedCompany}
                                onChange={(e) => handleCompanyChange(e.target.value)}
                                style={{
                                    height: "45px",
                                    borderRadius: "10px",
                                    border: "1px solid #d1d5db"
                                }}
                            >
                                <option value="">-- Select Company --</option>
                                {companies.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>


            <Modal
                show={showTableModal}
                onHide={() => setShowTableModal(false)}
                centered
                size="md"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span style={{ color: "#2563eb" }}>
                            {searchType}
                        </span>{" "}
                        <span style={{ color: "#ef4444" }}>
                            Prize Ticket List
                        </span>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <DataTable
                        columns={firstPrizeColumns}
                        data={firstPrizeData}
                        progressPending={firstPrizeLoading}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 25, 50, 100]}
                        highlightOnHover
                        striped
                        responsive
                        noDataComponent={
                            <div style={{ padding: 20, color: "red", fontWeight: 600 }}>
                                No data found!
                            </div>
                        }
                    />

                </Modal.Body>
            </Modal>
        </>
    );
};

export default Ticket;