import { useEffect, useState } from "react";
import { getAllCompanies } from "../../services/auth.api";


const Result = () => {

    const [companies, setCompanies] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    const handleClick = (url) => {
        window.open(url, "_blank"); 
    };

    return (
        <div style={{ padding: "20px" }}>
            <h3 style={{ marginBottom: "20px", fontWeight: "600" }}>
                Choice Company
            </h3>

            <div
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: "12px",
                    flexWrap: isMobile ? "nowrap" : "wrap",
                }}
            >
                <span
                    style={{
                        padding: "10px 18px",
                        borderRadius: "25px",
                        background: "linear-gradient(90deg, #1e40af, #dc2626)",
                        color: "#fff",
                        fontWeight: "500",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        transition: "0.2s",
                        width: isMobile ? "100%" : "auto",
                        textAlign: "center",
                    }}
                >
                    Ticketmap
                </span>
                {companies.map((company) => (
                    <div
                        key={company.id}
                        onClick={() => handleClick(company.url)}
                        style={{
                            padding: "10px 18px",
                            borderRadius: "25px",
                            background: "linear-gradient(90deg, #1e40af, #dc2626)",
                            color: "#fff",
                            fontWeight: "500",
                            cursor: "pointer",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            transition: "0.2s",
                            width: isMobile ? "100%" : "auto",
                            textAlign: "center",
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
        </div>
    );
};

export default Result;