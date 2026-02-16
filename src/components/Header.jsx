import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaBell,
  FaUserCircle,
  FaSignInAlt,
  FaTicketAlt,
  FaChartBar,
  FaUserShield,
  FaBullhorn,
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaCreditCard
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Header = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Detecting...");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const isMobile = screenWidth < 768;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            console.log(data.display_name, 'kk');

            const city =
              data.display_name

            setLocation(city || "Unknown");
          } catch {
            setLocation("Location Error");
          }
        },
        () => setLocation("Permission Denied")
      );
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <header
      style={{
        backgroundColor: "#1b2036",
        padding: "12px 15px",
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none",
          }}
        >
          <img src={logo} alt="Logo" style={{ height: "35px" }} />

          {!isMobile && (
            <span style={{ fontSize: "18px", fontWeight: "700" }}>
              <span style={{ color: "#1e40af" }}>Ticket</span>
              <span style={{ color: "#dc2626" }}>map</span>
            </span>
          )}
        </Link>

        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#2a2f4a",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "14px",
                maxWidth: "300px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              title={location}
            >
              <FaMapMarkerAlt color="#f97316" />
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {location}
              </span>
            </div>

            <div style={{ position: "relative", width: "40%" }}>
              <FaSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "12px",
                  transform: "translateY(-50%)",
                  color: "#6b7280",
                }}
              />
              <input
                type="text"
                placeholder="Search Shops, Lotteries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 35px",
                  borderRadius: "25px",
                  border: "none",
                  outline: "none",
                }}
              />
            </div>
          </div>
        )}


        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div style={{ position: "relative" }}>
            <FaBell size={18} />
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-8px",
                background: "red",
                color: "#fff",
                borderRadius: "50%",
                fontSize: "9px",
                padding: "2px 5px",
              }}
            >
              3
            </span>
          </div>

          <div
            ref={dropdownRef}
            style={{ position: "relative" }}
          >
            <FaUserCircle
              size={22}
              style={{ cursor: "pointer" }}
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "38px",
                  right: 0,
                  background: "#fff",
                  color: "#000",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  width: "200px",
                  overflow: "hidden",
                  zIndex: 999,
                }}
              >
                {[
                  { label: "Login", icon: <FaSignInAlt /> },
                  { label: "Ticket", icon: <FaTicketAlt /> },
                  { label: "Result", icon: <FaChartBar /> },
                  { label: "Roles", icon: <FaUserShield /> },
                  { label: "Notice", icon: <FaBullhorn /> },
                  { label: "Subscription", icon: <FaCreditCard /> },
                  { label: "Logout", icon: <FaSignOutAlt />, danger: true },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 15px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: item.danger ? "#dc2626" : "#111",
                      borderBottom:
                        index !== 5 ? "1px solid #f1f1f1" : "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f9fafb")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#fff")
                    }
                    onClick={() => {
                      setShowDropdown(false);
                      console.log(item.label);
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {isMobile && (
        <div style={{ marginTop: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "10px",
              fontSize: "14px",
            }}
          >
            <FaMapMarkerAlt color="#f97316" />
            {location}
          </div>

          <div style={{ position: "relative" }}>
            <FaSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "12px",
                transform: "translateY(-50%)",
                color: "#6b7280",
              }}
            />
            <input
              type="text"
              placeholder="Search Shops, Lotteries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px 10px 35px",
                borderRadius: "25px",
                border: "none",
                outline: "none",
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
