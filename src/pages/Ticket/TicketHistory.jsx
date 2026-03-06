import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getCustomerTickets } from "../../services/auth.api";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const TicketHistory = () => {

    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const { data } = await getCustomerTickets(user.id);

            if (data.success) {
                setTickets(data.data);
            }

        } catch (error) {
            console.error("Ticket fetch error:", error);
        } finally {
            setLoading(false);
        }

    };

    const columns = [
        {
            name: "Ticket No",
            selector: row => row.ticket_no,
            sortable: true
        },
        {
            name: "Price",
            selector: row => `₹${row.price}`,
            sortable: true
        },
        {
            name: "Date",
            selector: row => {
                const date = new Date(row.date);
                return date.toLocaleDateString("en-GB");
            },
            sortable: true
        },
        {
            name: "Time",
            selector: row => {
                const time = new Date(`1970-01-01T${row.time}`);
                return time.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                });
            },
            sortable: true
        }
    ];

    return (
        <div style={{ padding: "20px" }}>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "20px"
                }}
            >

                <FaArrowLeft
                    size={18}
                    style={{ cursor: "pointer", color: "#1e40af" }}
                    onClick={() => navigate("/ticket")}
                />

                <h3
                    style={{
                        margin: 0,
                        background: "linear-gradient(90deg, #1e40af, #dc2626)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "700"
                    }}
                >
                    Ticket History
                </h3>

            </div>

            <div
                style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    overflow: "hidden"
                }}
            >

                <DataTable
                    columns={columns}
                    data={tickets}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                    noDataComponent="No ticket history found!"
                />

            </div>

        </div>
    );
};

export default TicketHistory;