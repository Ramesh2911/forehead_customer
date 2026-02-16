import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <footer
      style={{
        background: "#111827",
        color: "#fff",
        padding: "50px 20px 20px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "12px",
              }}
            >
              <span style={{ color: "#1e40af" }}>Ticket</span>
              <span style={{ color: "#dc2626" }}>map</span>
            </div>

            <p
              style={{
                color: "#9ca3af",
                fontSize: "14px",
                lineHeight: "1.6",
                maxWidth: "300px",
              }}
            >
              Your trusted platform for lottery tickets,
              draws and real-time results.
            </p>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
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
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#d1d5db")
                }
              >
                {item}
              </Link>
            ))}
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: isMobile ? "flex-start" : "flex-end",
              alignItems: "flex-start",
              gap: "15px",
            }}
          >
            {[FaFacebookF, FaInstagram, FaXTwitter].map(
              (Icon, index) => (
                <div
                  key={index}
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#1f2937",
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
                    (e.currentTarget.style.background = "#1f2937")
                  }
                >
                  <Icon size={16} color="#fff" />
                </div>
              )
            )}
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #374151",
            marginTop: "40px",
            paddingTop: "15px",
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
