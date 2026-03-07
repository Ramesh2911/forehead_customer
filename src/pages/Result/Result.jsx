import { useEffect, useState } from "react";
import { getAllCompanies } from "../../services/auth.api";


const Result = () => {

    const [companies, setCompanies] = useState([]);

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
                        //onClick={() => handleCompanyClick(company.id)}
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
                <span
                    style={{
                        padding: "10px 18px",
                        borderRadius: "25px",
                        background: "linear-gradient(90deg, #1e40af, #dc2626)",
                        color: "#fff",
                        fontWeight: "500",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    }}
                >
                    Ticketmap
                </span>
            </div>
        </div>
    );
};

export default Result;