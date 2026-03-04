import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Support = () => {

  const phone = "9123314927";
  const email = "ticketmap2026@gmail.com";

  const openWhatsApp = () => {
    window.open(`https://wa.me/91${phone}`, "_blank");
  };

  const sendEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  const callSupport = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="support-page">

      {/* Header */}
      <div className="support-header">
        <h1>Need Help?</h1>
        <p>Our support team is here to assist you anytime.</p>
      </div>

      <Container className="mt-5">
        <Row className="g-4">

          {/* Call Support */}
          <Col md={4}>
            <Card className="support-card text-center">
              <div className="icon call">
                <FaPhoneAlt />
              </div>

              <h4>Contact Support</h4>

              <p>
                Call our support team for immediate help.
              </p>

              <Button
                className="support-btn"
                onClick={callSupport}
              >
                Call Now
              </Button>

              <div className="contact-text">
                {phone}
              </div>
            </Card>
          </Col>

          {/* WhatsApp Chat */}
          <Col md={4}>
            <Card className="support-card text-center">
              <div className="icon whatsapp">
                <FaWhatsapp />
              </div>

              <h4>Chat With Us</h4>

              <p>
                Connect with our support team instantly via WhatsApp.
              </p>

              <Button
                className="support-btn whatsapp-btn"
                onClick={openWhatsApp}
              >
                Start Chat
              </Button>

              <div className="contact-text">
                WhatsApp Support
              </div>
            </Card>
          </Col>

          {/* Email */}
          <Col md={4}>
            <Card className="support-card text-center">
              <div className="icon email">
                <FaEnvelope />
              </div>

              <h4>Email Us</h4>

              <p>
                Send us your query and we will reply shortly.
              </p>

              <Button
                className="support-btn email-btn"
                onClick={sendEmail}
              >
                Send Email
              </Button>

              <div className="contact-text">
                {email}
              </div>
            </Card>
          </Col>

        </Row>
      </Container>

      {/* CSS */}
      <style jsx>{`

        .support-header{
          background: linear-gradient(135deg,#4e73df,#1cc88a);
          color:white;
          text-align:center;
          padding:70px 20px;
        }

        .support-header h1{
          font-weight:700;
          font-size:40px;
        }

        .support-header p{
          opacity:0.9;
          margin-top:10px;
        }

        .support-card{
          border:none;
          padding:35px 25px;
          border-radius:15px;
          transition:0.3s;
          box-shadow:0 5px 20px rgba(0,0,0,0.08);
        }

        .support-card:hover{
          transform:translateY(-8px);
          box-shadow:0 10px 35px rgba(0,0,0,0.15);
        }

        .icon{
          font-size:35px;
          margin-bottom:15px;
          width:70px;
          height:70px;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:50%;
          margin:auto;
          color:white;
        }

        .icon.call{
          background:#4e73df;
        }

        .icon.whatsapp{
          background:#25D366;
        }

        .icon.email{
          background:#e74a3b;
        }

        .support-btn{
          margin-top:15px;
          border:none;
          background:#4e73df;
          padding:10px 20px;
          border-radius:8px;
        }

        .support-btn:hover{
          opacity:0.9;
        }

        .whatsapp-btn{
          background:#25D366;
        }

        .email-btn{
          background:#e74a3b;
        }

        .contact-text{
          margin-top:12px;
          font-weight:600;
          color:#555;
        }

        @media(max-width:768px){

          .support-header h1{
            font-size:30px;
          }

          .support-card{
            padding:25px;
          }

        }

      `}</style>

    </div>
  );
};

export default Support;