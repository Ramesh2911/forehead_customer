import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import indFlag from "../../assets/indFlag.jpg";
import { loginApi } from "../../services/auth.api";

const Login = () => {

    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
        const user = localStorage.getItem("user");

        if (user) {
            navigate("/");
        }
    }, []);

    const handlePhoneChange = async (e) => {

        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 10) {
            setPhone(value);
        }

        if (value.length === 10) {

            try {

                const res = await loginApi({
                    phone: value
                });

                if (res.data.success) {

                    toast.success(res.data.message);

                    localStorage.setItem(
                        "user",
                        JSON.stringify(res.data.data)
                    );

                    navigate("/");

                } else {

                    toast.error(res.data.message);

                }

            } catch (error) {

                toast.error("Login failed");

            }

        }
    };

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f3f4f6",
                padding: "20px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        fontWeight: "700",
                        background: "linear-gradient(90deg, #1e40af, #dc2626)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Login to Your Account
                </h2>

                <div
                    style={{
                        display: "flex",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        overflow: "hidden"
                    }}
                >
                    <div
                        style={{
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                        }}
                    >
                        <img src={indFlag} alt="India" style={{ width: "20px", height: "14px" }} />
                        +91
                    </div>

                    <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="XXXXXX3210"
                        style={{
                            flex: 1,
                            border: "none",
                            padding: "10px",
                            outline: "none"
                        }}
                    />
                </div>

                <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <span style={{ color: "#666" }}>
                        Don't have an account?{" "}
                    </span>

                    <Link
                        to="/register"
                        style={{
                            color: "#1e40af",
                            fontWeight: "600",
                            textDecoration: "none"
                        }}
                    >
                        Register here
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Login;
