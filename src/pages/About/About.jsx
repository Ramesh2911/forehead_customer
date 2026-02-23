
const About = () => {
    return (
        <div style={{ background: "#f8fafc", padding: "60px 15px" }}>
            <div className="container" style={{ maxWidth: "1100px" }}>
                <div className="text-center mb-5">
                    <h1 style={{ fontWeight: "700", color: "#1e40af" }}>
                        About Ticketmap
                    </h1>
                    <p className="text-muted mt-3" style={{ fontSize: "16px" }}>
                        Your trusted information platform for lottery-related updates,
                        retailer discovery, and public draw results.
                    </p>
                </div>
                <div className="row align-items-center mb-5">
                    <div className="col-12 col-md-6 mb-4 mb-md-0">
                        <h4 style={{ color: "#dc2626", fontWeight: "600" }}>
                            Who We Are
                        </h4>
                        <p style={{ color: "#374151", lineHeight: "1.8" }}>
                            Ticketmap is an independent digital platform designed to provide
                            structured and easy access to publicly available lottery-related
                            information. Our goal is to enhance transparency and accessibility
                            without participating in lottery sales or operations.
                        </p>
                    </div>

                    <div className="col-12 col-md-6">
                        <h4 style={{ color: "#dc2626", fontWeight: "600" }}>
                            What We Provide
                        </h4>
                        <ul style={{ color: "#374151", lineHeight: "1.8" }}>
                            <li>Retailer & shop listing information</li>
                            <li>Ticket availability updates (retailer-provided)</li>
                            <li>Public draw schedules</li>
                            <li>Officially declared lottery results</li>
                            <li>Subscription-based platform features</li>
                        </ul>
                    </div>
                </div>
                <div
                    style={{
                        background: "#ffffff",
                        padding: "30px",
                        borderRadius: "12px",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                        marginBottom: "40px",
                    }}
                >
                    <h4 style={{ color: "#1e40af", fontWeight: "600" }}>
                        Important Legal Clarification
                    </h4>
                    <ul style={{ color: "#374151", lineHeight: "1.9", marginTop: "15px" }}>
                        <li>❌ Ticketmap does NOT sell lottery tickets.</li>
                        <li>❌ Ticketmap does NOT conduct lottery draws.</li>
                        <li>❌ Ticketmap does NOT process lottery payments.</li>
                        <li>❌ Ticketmap does NOT guarantee prizes.</li>
                        <li>❌ Ticketmap does NOT promote gambling.</li>
                    </ul>
                    <p style={{ marginTop: "15px", color: "#374151" }}>
                        All lottery operations are conducted solely by authorized government
                        authorities such as the Directorate of State Lotteries.
                    </p>
                </div>
                <div className="row mb-5">
                    <div className="col-12 col-md-6 mb-4">
                        <div
                            style={{
                                background: "#ffffff",
                                padding: "25px",
                                borderRadius: "12px",
                                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                                height: "100%",
                            }}
                        >
                            <h5 style={{ color: "#dc2626", fontWeight: "600" }}>
                                Our Mission
                            </h5>
                            <p style={{ color: "#374151", lineHeight: "1.8" }}>
                                To provide a transparent, secure, and structured digital
                                platform that simplifies access to publicly available lottery
                                information while maintaining strict legal compliance.
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 mb-4">
                        <div
                            style={{
                                background: "#ffffff",
                                padding: "25px",
                                borderRadius: "12px",
                                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                                height: "100%",
                            }}
                        >
                            <h5 style={{ color: "#dc2626", fontWeight: "600" }}>
                                Our Vision
                            </h5>
                            <p style={{ color: "#374151", lineHeight: "1.8" }}>
                                To become the most reliable and legally compliant information
                                intermediary platform in the lottery information ecosystem.
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        background: "#ffffff",
                        padding: "30px",
                        borderRadius: "12px",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    }}
                >
                    <h4 style={{ color: "#1e40af", fontWeight: "600" }}>
                        Legal & Compliance Commitment
                    </h4>
                    <p style={{ color: "#374151", lineHeight: "1.8", marginTop: "15px" }}>
                        Ticketmap operates in compliance with applicable Indian laws,
                        including the Lotteries Regulation Act, 1998 and relevant state
                        lottery regulations. We are committed to transparent, ethical, and
                        lawful operations.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;