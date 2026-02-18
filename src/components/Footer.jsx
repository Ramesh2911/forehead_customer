import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#fff",
        padding: "60px 20px 20px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Top Section */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "40px",
          }}
        >
          {/* Logo & Description */}
          <div
            style={{
              flex: isMobile ? "100%" : "0 0 35%",
            }}
          >
            <div
              style={{
                fontSize: "26px",
                fontWeight: "700",
                marginBottom: "15px",
              }}
            >
              <span style={{ color: "#2563eb" }}>Ticket</span>
              <span style={{ color: "#ef4444" }}>map</span>
            </div>

            <p
              style={{
                color: "#9ca3af",
                fontSize: "14px",
                lineHeight: "1.7",
                maxWidth: "320px",
              }}
            >
              Your trusted platform for lottery tickets, draws
              and real-time results.
            </p>
          </div>

          {/* Links */}
          <div
            style={{
              flex: isMobile ? "100%" : "0 0 30%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              fontSize: "14px",
            }}
          >
            {[
              "About",
              "Subscription",
              "Rules",
              "Terms & Conditions",
              "Privacy Policy",
            ].map((item, index) => (
              <Link
                key={index}
                to="/"
                style={{
                  color: "#d1d5db",
                  textDecoration: "none",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#ffffff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#d1d5db")
                }
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div
            style={{
              flex: isMobile ? "100%" : "0 0 30%",
              display: "flex",
              justifyContent: isMobile ? "flex-start" : "flex-end",
              alignItems: "flex-start",
              gap: "15px",
              marginTop: isMobile ? "10px" : "0px",
            }}
          >
            {[FaFacebookF, FaInstagram, FaXTwitter].map(
              (Icon, index) => (
                <div
                  key={index}
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#1e293b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#2563eb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#1e293b")
                  }
                >
                  <Icon size={16} color="#fff" />
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            borderTop: "1px solid #1f2937",
            marginTop: "50px",
            paddingTop: "20px",
            textAlign: "center",
            fontSize: "13px",
            color: "#9ca3af",
          }}
        >
          © {new Date().getFullYear()} Ticketmap. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
