import { useEffect, useState } from "react";
import { getAllSubcription } from "../../services/auth.api";

const Subcription = () => {

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const res = await getAllSubcription();

            if (res?.data?.success) {
                const customerPlans = res.data?.data?.filter(
                    (item) => item.role_id === 4
                );

                setPlans(customerPlans);
            }
        } catch (error) {
            console.error("Error fetching plans:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <div
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: "50px",
                        height: "50px",
                        border: "5px solid #e5e7eb",
                        borderTop: "5px solid #2563eb",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                    }}
                />
            </div>
        );


    return (
        <div
            style={{
                padding: "60px 20px",
                display: "grid",
                gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr",
                gap: "35px",
                maxWidth: "1100px",
                margin: "0 auto",
            }}
        >
            {plans.map((plan) => {
                const isYearly = plan.plan_type === "YEARLY";

                return (
                    <div
                        key={plan.id}
                        style={{
                            background: "#ffffff",
                            borderRadius: "20px",
                            padding: "40px 30px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                            borderTop: `6px solid ${isYearly ? "#2563eb" : "#22c55e"
                                }`,
                            textAlign: "center",
                            transition: "0.3s",
                        }}
                    >
                        {/* Plan Name */}
                        <h2
                            style={{
                                marginBottom: "20px",
                                fontWeight: "600",
                                color: "#111827",
                            }}
                        >
                            {plan.plan_name}
                        </h2>

                        {/* Price */}
                        <div
                            style={{
                                fontSize: "48px",
                                fontWeight: "700",
                                color: "#111827",
                            }}
                        >
                            ₹{plan.price}
                        </div>

                        <div
                            style={{
                                marginBottom: "30px",
                                fontSize: "16px",
                                color: "#6b7280",
                            }}
                        >
                            {isYearly ? "/ year" : "/ month"}
                        </div>

                        {/* Features */}
                        <div
                            style={{
                                textAlign: "left",
                                marginBottom: "35px",
                                lineHeight: "2",
                                fontSize: "15px",
                                color: "#374151",
                            }}
                        >
                            <div>✔ Duration: {plan.duration_days} Days</div>
                            <div>✔ Role: {plan.role_name}</div>
                            <div>✔ Standard Support</div>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "15px",
                            }}
                        >
                            <button
                                style={{
                                    padding: "12px",
                                    borderRadius: "40px",
                                    border: `2px solid ${isYearly ? "#2563eb" : "#22c55e"
                                        }`,
                                    background: "transparent",
                                    color: isYearly ? "#2563eb" : "#22c55e",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "0.3s",
                                }}
                                onClick={() => {
                                    alert(`Plan Details: ${plan.plan_name}`);
                                }}
                            >
                                More Details
                            </button>
                            <button
                                style={{
                                    padding: "12px",
                                    borderRadius: "40px",
                                    border: "none",
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    background: isYearly ? "#2563eb" : "#22c55e",
                                    color: "#fff",
                                    transition: "0.3s",
                                }}
                                onClick={() => {
                                    alert(`Buying Plan: ${plan.plan_name}`);
                                }}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Subcription;
