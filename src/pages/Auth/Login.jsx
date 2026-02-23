import { useState, useRef } from "react";
import { toast } from "react-toastify";
import indFlag from "../../assets/indFlag.jpg";
import { Link } from "react-router-dom";

const Login = () => {

  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("phone");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    police_station: "",
    pin: "",
  });

  const inputsRef = useRef([]);

  /* ---------------- Phone ---------------- */
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setPhone(value);
  };

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }

    if (!agreed) {
      toast.error("Please accept Terms & Conditions and Privacy Policy");
      return;
    }
    toast.success("OTP Sent Successfully");
    setStep("otp");
  };

  /* ---------------- OTP ---------------- */
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      toast.error("Enter 4 digit OTP");
      return;
    }

    toast.success("OTP Verified Successfully");
    setStep("form");
  };

  /* ---------------- FORM ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "pin") {
      const onlyNumber = value.replace(/\D/g, "");
      if (onlyNumber.length <= 6) {
        setFormData({ ...formData, [name]: onlyNumber });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    const { name, email, address, police_station, pin } = formData;

    if (!name || !address || !police_station || pin.length !== 6) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Enter valid email address");
        return;
      }
    }

    toast.success("Form Submitted Successfully 🎉");
    console.log(formData);
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
          {step === "phone"
            ? "Login"
            : step === "otp"
              ? "Verify OTP"
              : "Complete Profile"}
        </h2>

        {/* ---------------- PHONE STEP ---------------- */}
        {step === "phone" && (
          <>
            <div style={{ display: "flex", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
              <div style={{ padding: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                <img src={indFlag} alt="India" style={{ width: "20px", height: "14px" }} />
                +91
              </div>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="XXXXXX3210"
                style={{ flex: 1, border: "none", padding: "10px", outline: "none" }}
              />
            </div>
            <div style={{ marginTop: "12px", fontSize: "14px", color: "#374151" }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ marginTop: "4px" }}
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" style={{ color: "#1e40af", fontWeight: 500 }}>
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" style={{ color: "#dc2626", fontWeight: 500 }}>
                    Privacy Policy
                  </Link>.
                </span>
              </label>
            </div>
            <button
              style={{
                ...btnStyle("#2563eb"),
                opacity: agreed ? 1 : 0.6,
                cursor: agreed ? "pointer" : "not-allowed",
              }}
              onClick={handleSendOtp}
              disabled={!agreed}
            >
              Send OTP
            </button>
          </>
        )}

        {/* ---------------- OTP STEP ---------------- */}
        {step === "otp" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  style={{
                    width: "60px",
                    height: "50px",
                    textAlign: "center",
                    fontSize: "18px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              ))}
            </div>

            <button style={btnStyle("#16a34a")} onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {/* ---------------- FORM STEP ---------------- */}
        {step === "form" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "20px",
                rowGap: "18px",
              }}
            >
              {["name", "email", "address", "police_station", "pin"].map((field, index) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={formData[field]}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              ))}
            </div>
            <button
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "#2563eb",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const btnStyle = (bg) => ({
  width: "100%",
  marginTop: "15px",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: bg,
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
});

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
};

export default Login;
