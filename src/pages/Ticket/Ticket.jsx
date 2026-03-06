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
    FaInfoCircle,
    FaUpload
} from "react-icons/fa";
import {
    getAllCompanies,
    getFirstPrizeListByCompany,
    getTicketListByWeek
}
    from "../../services/auth.api";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Ticket = () => {

    const navigate = useNavigate();
    const weekOptions = [
        { value: "1", label: "1 Week" },
        { value: "2", label: "2 Week" },
        { value: "3", label: "3 Week" },
        { value: "4", label: "4 Week" },
        { value: "2m", label: "2 Month" },
        { value: "3m", label: "3 Month" },
        { value: "4m", label: "4 Month" },
        { value: "5m", label: "5 Month" },
        { value: "6m", label: "6 Month" },
        { value: "7m", label: "7 Month" },
        { value: "8m", label: "8 Month" },
        { value: "9m", label: "9 Month" },
        { value: "10m", label: "10 Month" },
        { value: "11m", label: "11 Month" },
        { value: "12m", label: "12 Month" },
    ];

    const [showSearchModal, setShowSearchModal] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [searchType, setSearchType] = useState("");
    const [firstPrizeData, setFirstPrizeData] = useState([]);
    const [firstPrizeLoading, setFirstPrizeLoading] = useState(false);
    const [showTableModal, setShowTableModal] = useState(false);
    const [showNumberModal, setShowNumberModal] = useState(false);
    const [ticketInput, setTicketInput] = useState("");
    const [selectedWeek, setSelectedWeek] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

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

        setShowSearchModal(false);

        if (searchType === "1st") {

            setFirstPrizeLoading(true);

            try {
                const res = await getFirstPrizeListByCompany(companyId);

                if (res.data.success) {
                    setFirstPrizeData(res.data.data || []);
                } else {
                    setFirstPrizeData([]);
                }

                setShowTableModal(true);

            } catch (error) {
                console.error(error);
                setFirstPrizeData([]);
                setShowTableModal(true);
            } finally {
                setFirstPrizeLoading(false);
            }

        } else {
            setShowNumberModal(true);
        }
    };

    const handleCloseNumberModal = () => {
        setShowNumberModal(false);
        setSelectedCompany("");
        setSelectedWeek("");
        setTicketInput("");
    };

    const handleCloseTableModal = () => {
        setShowTableModal(false);
        setSelectedCompany("");
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

    const handleSearch = async () => {

        if (!selectedWeek) {
            toast.error("Please select week.");
            return;
        }

        if (!ticketInput) {
            toast.error("Please enter ticket number.");
            return;
        }

        if (searchType === "4digit" && ticketInput.length !== 4) {
            toast.error("Please enter exactly 4 digits.");
            return;
        }

        if (
            (searchType === "middle2" || searchType === "last2") &&
            ticketInput.length !== 2
        ) {
            toast.error("Please enter exactly 2 digits.");
            return;
        }

        try {
            setSearchLoading(true);
            setHasSearched(true);

            const res = await getTicketListByWeek(
                selectedCompany,
                selectedWeek,
                ticketInput
            );

            if (res.data.success) {
                setSearchData(res.data.data || []);
            } else {
                setSearchData([]);
            }

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
            setSearchData([]);
        } finally {
            setSearchLoading(false);
        }
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
                    Ticket Upload
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 320px))",
                        gap: "16px",
                        justifyContent: "flex-start"
                    }}
                >

                    <DashboardCard
                        title="Ticket Upload"
                        subtitle="Upload New Tickets"
                        gradient="linear-gradient(135deg, #3b82f6, #1e40af)"
                        Icon={FaUpload}
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
                        title="My PWT List"
                        subtitle="Check Uploaded Results"
                        gradient="linear-gradient(135deg, #22c55e, #16a34a)"
                        Icon={FaListAlt}
                    />

                    <DashboardCard
                        title="Ticket Type Retailers"
                        subtitle="Browse By Ticket Type"
                        gradient="linear-gradient(135deg, #fbbf24, #f59e0b)"
                        Icon={FaTags}
                        onClick={() => navigate("/type-retailers")}
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

            {/* // Select Company */}
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

            {/* // 1st Prize  */}
            <Modal
                show={showTableModal}
                onHide={handleCloseTableModal}
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

            {/* // Number Search Modal */}
            <Modal
                show={showNumberModal}
                onHide={handleCloseNumberModal}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span style={{ color: "#2563eb" }}>
                            {searchType}
                        </span>{" "}
                        <span style={{ color: "#ef4444" }}>
                            Ticket Search
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="align-items-end g-2">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Select Week</Form.Label>
                                    <Form.Select
                                        value={selectedWeek}
                                        onChange={(e) => setSelectedWeek(e.target.value)}
                                    >
                                        <option value="">-- Select Week --</option>
                                        {weekOptions.map((week) => (
                                            <option key={week.value} value={week.value}>
                                                {week.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Enter Ticket No.</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ticketInput}
                                        maxLength={
                                            searchType === "4digit" ? 4 :
                                                searchType === "middle2" ? 2 :
                                                    searchType === "last2" ? 2 : undefined
                                        }
                                        placeholder={
                                            searchType === "4digit"
                                                ? "Enter 4 Digit Ticket Number"
                                                : searchType === "middle2"
                                                    ? "Enter Middle 2 Digit Number"
                                                    : searchType === "last2"
                                                        ? "Enter Last 2 Digit Number"
                                                        : "Enter Ticket Number"
                                        }
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");
                                            setTicketInput(value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Button
                                    className="w-100"
                                    style={{
                                        background: "linear-gradient(90deg, #1e40af, #dc2626)",
                                        border: "none",
                                        color: "#fff"
                                    }}
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    {hasSearched && (
                        <div className="mt-4">
                            <DataTable
                                columns={[
                                    {
                                        name: "Date",
                                        selector: row =>
                                            new Date(row.ticket_date).toLocaleDateString("en-GB"),
                                        sortable: true
                                    },
                                    {
                                        name: "Ticket No",
                                        selector: row => row.ticket_no,
                                        sortable: true
                                    },
                                    {
                                        name: "Prize Type",
                                        selector: row => row.prize_type,
                                    },
                                    {
                                        name: "Amount",
                                        selector: row => `₹ ${Number(row.amount).toLocaleString()}`,
                                    },
                                    {
                                        name: "Status",
                                        cell: row => (
                                            <span style={{
                                                color: row.is_sold ? "green" : "red",
                                                fontWeight: 600
                                            }}>
                                                {row.is_sold ? "Sold" : "Unsold"}
                                            </span>
                                        )
                                    }
                                ]}
                                data={searchData}
                                progressPending={searchLoading}
                                pagination
                                paginationPerPage={5}
                                paginationRowsPerPageOptions={[5, 20, 50, 100]}
                                highlightOnHover
                                striped
                                responsive
                                noDataComponent={
                                    <div style={{
                                        padding: 20,
                                        color: "red",
                                        fontWeight: 600
                                    }}>
                                        No record found!
                                    </div>
                                }
                            />
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Ticket;