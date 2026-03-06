import {
    useEffect,
    useState
}
    from "react";
import {
    getAllCompanies,
    ticketUploadApi
}
    from "../../services/auth.api";
import {
    FaPlus,
    FaTimes
}
    from "react-icons/fa";
import { toast } from "react-toastify";

const TicketUpload = () => {

    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const [rows, setRows] = useState([
        { ticket_no: "", date: "", time: "", price: "" }
    ]);

    useEffect(() => {
        fetchCompanies();
    }, []);

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

    const handleAddRow = () => {
        setRows([
            ...rows,
            { ticket_no: "", date: "", time: "", price: "" }
        ]);
    };

    const handleRemoveRow = (index) => {
        const updated = [...rows];
        updated.splice(index, 1);
        setRows(updated);
    };

    const handleChange = (index, field, value) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    const handleSave = async () => {
        try {

            const user = JSON.parse(localStorage.getItem("user"));

            if (!selectedCompany) {
                toast.error("Please select company");
                return;
            }

            if (rows.length === 0) {
                toast.error("Please add ticket");
                return;
            }

            for (let row of rows) {

                if (!row.ticket_no) {
                    toast.error("Ticket number required");
                    return;
                }

                if (!row.price) {
                    toast.error("Price required");
                    return;
                }

                if (!row.date) {
                    toast.error("Date required");
                    return;
                }

                if (!row.time) {
                    toast.error("Time required");
                    return;
                }

            }

            const payload = {
                customer_id: user.id,
                company_id: selectedCompany.id,
                tickets: rows
            };

            const { data } = await ticketUploadApi(payload);

            if (data.success) {

                toast.success(data.message);

                setRows([
                    { ticket_no: "", date: "", time: "", price: "" }
                ]);

            }

        } catch (error) {

            console.error(error);
            toast.error("Ticket save failed");

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
                {companies?.map((company) => (
                    <div
                        key={company.id}
                        onClick={() => setSelectedCompany(company)}
                        style={{
                            padding: "10px 18px",
                            borderRadius: "25px",
                            background: "linear-gradient(90deg, #1e40af, #dc2626)",
                            color: "#fff",
                            fontWeight: "500",
                            cursor: "pointer",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            borderBottom: selectedCompany?.id === company.id
                                ? "3px solid #3b82f6"
                                : "none"
                        }}
                    >
                        {company.name}
                    </div>
                ))}
            </div>
            {selectedCompany && (
                <div
                    style={{
                        marginTop: "40px",
                        maxWidth: "900px",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <h3
                        style={{
                            textAlign: "center",
                            marginBottom: "20px"
                        }}
                    >
                        {selectedCompany.name}
                    </h3>

                    {rows?.map((row, index) => (
                        <div
                            key={index}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "10px",
                                marginBottom: "12px",
                                alignItems: "center"
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Ticket No"
                                value={row.ticket_no}
                                onChange={(e) =>
                                    handleChange(index, "ticket_no", e.target.value)
                                }
                                style={inputStyle}
                            />
                            <input
                                type="date"
                                value={row.date}
                                onChange={(e) =>
                                    handleChange(index, "date", e.target.value)
                                }
                                style={inputStyle}
                            />
                            <input
                                type="time"
                                value={row.time}
                                onChange={(e) =>
                                    handleChange(index, "time", e.target.value)
                                }
                                style={inputStyle}
                            />
                            <input
                                type="text"
                                placeholder="₹0.00"
                                value={row.price}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*\.?\d{0,2}$/.test(value)) {
                                        handleChange(index, "price", value);
                                    }
                                }}
                                style={inputStyle}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    gap: "6px"
                                }}
                            >
                                <FaPlus
                                    onClick={handleAddRow}
                                    style={{
                                        color: "#1e40af",
                                        fontSize: "16px",
                                        cursor: "pointer",
                                        border: "2px solid #1e40af",
                                        borderRadius: "50%",
                                        padding: "6px",
                                        width: "30px",
                                        height: "30px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                />

                                {index !== 0 && (
                                    <FaTimes
                                        onClick={() => handleRemoveRow(index)}
                                        style={{
                                            color: "#dc2626",
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            border: "2px solid #dc2626",
                                            borderRadius: "50%",
                                            padding: "6px",
                                            width: "30px",
                                            height: "30px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <button
                            onClick={handleSave}
                            style={{
                                padding: "10px 30px",
                                borderRadius: "25px",
                                border: "none",
                                background: "#2563eb",
                                color: "#fff",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const inputStyle = {
    padding: "8px 10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    width: "100%",
    height: "44px",
    boxSizing: "border-box",
    fontSize: "14px"
};

export default TicketUpload;