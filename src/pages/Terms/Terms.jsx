
const Terms = () => {
    const sections = [
        {
            title: "1. Introduction",
            content: (
                <>
                    <p>
                        Welcome to <strong>Ticketmap</strong> (“Platform”), operated by
                        [Insert Registered Company Name] (“Company”, “We”, “Us”).
                    </p>
                    <p>
                        By accessing or using the Platform, you agree to be bound by these
                        Terms & Conditions. If you do not agree, please discontinue use.
                    </p>
                </>
            ),
        },
        {
            title: "2. Nature of the Platform",
            content: (
                <>
                    <p>Ticketmap is strictly an information-only platform.</p>
                    <ul>
                        <li>Does NOT sell lottery tickets</li>
                        <li>Does NOT conduct lottery draws</li>
                        <li>Does NOT process lottery ticket payments</li>
                        <li>Does NOT guarantee prizes</li>
                        <li>Does NOT promote gambling</li>
                    </ul>
                    <p>
                        All lotteries are conducted by authorized government authorities
                        such as Directorate of State Lotteries.
                    </p>
                </>
            ),
        },
        {
            title: "3. Eligibility",
            content: (
                <ul>
                    <li>You must be at least 18 years old.</li>
                    <li>You must comply with applicable laws.</li>
                    <li>You must provide accurate registration details.</li>
                </ul>
            ),
        },
        {
            title: "4. Account Types",
            content: (
                <ul>
                    <li>Customer Account</li>
                    <li>Retailer Account</li>
                    <li>Sub-Stockist Account</li>
                    <li>Super Stockist Account</li>
                </ul>
            ),
        },
        {
            title: "5. Retailer Responsibilities",
            content: (
                <>
                    <ul>
                        <li>Must be legally authorized to sell lottery tickets.</li>
                        <li>Must upload accurate ticket data.</li>
                        <li>Must comply with government lottery regulations.</li>
                    </ul>
                    <p>
                        Ticketmap is not responsible for retailer misconduct or offline
                        disputes.
                    </p>
                </>
            ),
        },
        {
            title: "6. Ticket Availability Disclaimer",
            content: (
                <p>
                    Ticket availability is based on retailer updates. Ticketmap does not
                    guarantee real-time stock accuracy or prize-winning status.
                </p>
            ),
        },
        {
            title: "7. Results Disclaimer",
            content: (
                <p>
                    Results displayed are based on publicly available announcements.
                    Users must verify with official government sources before claiming
                    prizes.
                </p>
            ),
        },
        {
            title: "8. Subscription & Wallet Policy",
            content: (
                <ul>
                    <li>Subscription fees are for platform access only.</li>
                    <li>Subscription does not include ticket purchase.</li>
                    <li>Payments are non-refundable unless required by law.</li>
                </ul>
            ),
        },
        {
            title: "9. Limitation of Liability",
            content: (
                <ul>
                    <li>No liability for financial loss from lottery participation.</li>
                    <li>No liability for ticket disputes or prize rejection.</li>
                    <li>No liability for system downtime.</li>
                </ul>
            ),
        },
        {
            title: "10. Prohibited Activities",
            content: (
                <ul>
                    <li>Illegal lottery activities</li>
                    <li>Uploading false data</li>
                    <li>Hacking or system disruption</li>
                    <li>Commercial misuse of platform data</li>
                </ul>
            ),
        },
        {
            title: "11. Data Collection & Usage",
            content: (
                <p>
                    Data such as Name, Phone number, Location, and Device information
                    may be collected strictly for platform functionality.
                </p>
            ),
        },
        {
            title: "12. Intellectual Property",
            content: (
                <p>
                    All brand elements including name, logo, design, and software are
                    intellectual property of the Company.
                </p>
            ),
        },
        {
            title: "13. Legal Compliance",
            content: (
                <p>
                    Ticketmap operates in compliance with applicable Indian laws
                    including the Lotteries Regulation Act, 1998.
                </p>
            ),
        },
        {
            title: "14. Account Suspension",
            content: (
                <p>
                    Accounts may be suspended or terminated without notice if terms are
                    violated or legal risks arise.
                </p>
            ),
        },
        {
            title: "15. Modification of Terms",
            content: (
                <p>
                    Ticketmap reserves the right to update these Terms at any time.
                </p>
            ),
        },
        {
            title: "16. Governing Law & Jurisdiction",
            content: (
                <p>
                    These Terms shall be governed by the laws of India. Disputes shall be
                    subject to jurisdiction of courts in [Insert City, State].
                </p>
            ),
        },
    ];

    return (
        <div style={{ background: "#f8fafc", padding: "60px 15px" }}>
            <div className="container" style={{ maxWidth: "1100px" }}>

                <div className="text-center mb-5">
                    <h1 style={{ fontWeight: "700", color: "#1e40af" }}>
                        TERMS & CONDITIONS
                    </h1>

                    <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-3 text-muted">
                        <span><strong>Effective Date:</strong>23/02/2026</span>
                        <span className="d-none d-md-inline">|</span>
                        <span><strong>Platform Name:</strong> Ticketmap</span>
                        <span className="d-none d-md-inline">|</span>
                        <span><strong>Company Name:</strong>Ticketmap</span>
                    </div>
                </div>

                {/* Sections Grid */}
                <div className="row">
                    {sections.map((section, index) => (
                        <div key={index} className="col-12 col-md-6 mb-4">
                            <div
                                style={{
                                    background: "#ffffff",
                                    padding: "25px",
                                    borderRadius: "12px",
                                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                                    height: "100%",
                                }}
                            >
                                <h5
                                    style={{
                                        color: "#dc2626",
                                        fontWeight: "600",
                                        marginBottom: "15px",
                                    }}
                                >
                                    {section.title}
                                </h5>

                                <div
                                    style={{
                                        fontSize: "14.5px",
                                        lineHeight: "1.8",
                                        color: "#374151",
                                    }}
                                >
                                    {section.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Terms;