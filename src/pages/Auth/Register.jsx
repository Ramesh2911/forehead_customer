import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import indFlag from "../../assets/indFlag.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  sendOtpApi,
  resendOtpApi,
  verifyOtpApi,
  getStatesApi,
  getDistrictsApi,
  getCitiesApi,
  getPoliceStationsApi,
  registrationApi
} from "../../services/auth.api";

const Register = () => {

  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    state_id: "",
    dist_id: "",
    city_id: "",
    station_id: "",
    pin: "",
    address: ""
  });

  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("phone");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [agreed, setAgreed] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (step === "form") {
      loadStates();
      getCurrentLocation();
    }
  }, [step]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      () => {
        toast.error("Please enable location for registration");
      }
    );
  };

  const loadStates = async () => {
    try {
      const res = await getStatesApi();

      if (res?.data?.success) {
        setStateList(res.data.data);
      } else {
        setStateList([]);
      }
    } catch (err) {
      setStateList([]);
    }
  };

  const startTimer = () => {
    setCanResend(false);
    setTimer(60);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setPhone(value);
  };

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }

    if (!agreed) {
      toast.error("Please accept Terms & Conditions and Privacy Policy");
      return;
    }

    try {
      await sendOtpApi({ phone });

      toast.success("OTP Sent Successfully");
      setStep("otp");

      startTimer();
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtpApi({ phone });

      toast.success("OTP Resent Successfully");

      startTimer();
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      toast.error("Enter 4 digit OTP");
      return;
    }

    try {
      await verifyOtpApi({
        phone,
        otp: enteredOtp
      });

      toast.success("OTP Verified Successfully");
      setStep("form");
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "pin") {
  //     const onlyNumber = value.replace(/\D/g, "");
  //     if (onlyNumber.length <= 6) {
  //       setFormData({ ...formData, [name]: onlyNumber });
  //     }
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };


  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if (name === "pin") {
      const onlyNumber = value.replace(/\D/g, "");
      if (onlyNumber.length <= 6) {
        setFormData({ ...formData, [name]: onlyNumber });
      }
      return;
    }

    setFormData({ ...formData, [name]: value });

    // STATE SELECT
    if (name === "state_id") {
      try {
        const res = await getDistrictsApi(value);

        if (res?.data?.success) {
          setDistrictList(res.data.data);
          setCityList([]);
          setStationList([]);
        } else {
          setDistrictList([]);
        }
      } catch {
        setDistrictList([]);
      }
    }

    // DISTRICT SELECT
    if (name === "dist_id") {
      try {
        const res = await getCitiesApi(value);

        if (res?.data?.success) {
          setCityList(res.data.data);
          setStationList([]);
        } else {
          setCityList([]);
        }
      } catch {
        setCityList([]);
      }
    }

    // CITY SELECT
    if (name === "city_id") {
      try {
        const res = await getPoliceStationsApi(value);

        if (res?.data?.success) {
          setStationList(res.data.data);
        } else {
          setStationList([]);
        }
      } catch {
        setStationList([]);
      }
    }
  };

  const handleSubmit = async () => {

    const {
      name,
      email,
      state_id,
      dist_id,
      city_id,
      station_id,
      pin,
      address
    } = formData;

    if (
      !name ||
      !state_id ||
      !dist_id ||
      !city_id ||
      !station_id ||
      !address ||
      pin.length !== 6
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!latitude || !longitude) {
      toast.error("Please enable location");
      return;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Enter valid email");
        return;
      }
    }

    try {

      const payload = {
        phone,
        ...formData,
        latitude,
        longitude
      };

      const res = await registrationApi(payload);

      if (res.data.success) {
        toast.success("Registration successful");
        navigate("/login");
      }

    } catch (error) {
      toast.error("Registration failed");
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
          {step === "phone"
            ? "Registration"
            : step === "otp"
              ? "Verify OTP"
              : "Complete Profile"}
        </h2>

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

        {step === "otp" && (
          <>
            <p
              style={{
                textAlign: "center",
                marginBottom: "15px",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              OTP sent to <strong>+91 {phone}</strong>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
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
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              {canResend ? (
                <span
                  onClick={handleResendOtp}
                  style={{
                    color: "#2563eb",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Resend OTP
                </span>
              ) : (
                <span style={{ color: "#6b7280" }}>
                  Resend OTP in {timer}s
                </span>
              )}
            </div>
            <button style={btnStyle("#16a34a")} onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        )}

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

              {/* Name */}
              <input
                name="name"
                placeholder="NAME"
                value={formData.name}
                onChange={handleInputChange}
                style={inputStyle}
              />

              {/* Email */}
              <input
                name="email"
                placeholder="EMAIL"
                value={formData.email}
                onChange={handleInputChange}
                style={inputStyle}
              />

              {/* State */}
              <select
                name="state_id"
                value={formData.state_id}
                onChange={handleInputChange}
                style={inputStyle}
              >
                <option value="">Select State</option>
                {stateList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.state_name}
                  </option>
                ))}
              </select>

              {/* District */}
              <select
                name="dist_id"
                value={formData.dist_id}
                onChange={handleInputChange}
                style={inputStyle}
              >
                <option value="">Select District</option>
                {districtList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.district_name}
                  </option>
                ))}
              </select>

              {/* City */}
              <select
                name="city_id"
                value={formData.city_id}
                onChange={handleInputChange}
                style={inputStyle}
              >
                <option value="">Select City</option>
                {cityList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.city_name}
                  </option>
                ))}
              </select>

              {/* Police Station */}
              <select
                name="station_id"
                value={formData.station_id}
                onChange={handleInputChange}
                style={inputStyle}
              >
                <option value="">Select Police Station</option>
                {stationList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.station_name}
                  </option>
                ))}
              </select>

              {/* PIN */}
              <input
                name="pin"
                placeholder="PIN CODE"
                value={formData.pin}
                onChange={handleInputChange}
                style={inputStyle}
              />

              {/* Address */}
              <textarea
                name="address"
                placeholder="ADDRESS"
                value={formData.address}
                onChange={handleInputChange}
                style={{
                  ...inputStyle,
                  gridColumn: "span 2",
                  height: "80px",
                }}
              />
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
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  outline: "none",
  boxSizing: "border-box",
};

export default Register;
