
const PrivacyPolicy = () => {
    return (
        <div style={{ background: "#f8fafc", padding: "60px 15px" }}>
            <div className="container" style={{ maxWidth: "1000px" }}>

                <div className="text-center mb-5">
                    <h1
                        style={{
                            fontWeight: "700",
                            color: "#1e40af",
                        }}
                    >
                        🔐 PRIVACY POLICY
                    </h1>

                    <div
                        className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-3"
                        style={{ fontSize: "14px" }}
                    >
                        <p className="mb-0 text-muted">
                            <strong>Effective Date:</strong> 23/02/2026
                        </p>

                        <p className="mb-0 text-muted">
                            <strong>Last Updated:</strong> 23/02/2026
                        </p>

                        <p className="mb-0 text-muted">
                            <strong>Operated by:</strong> Pintu Sardar
                        </p>
                    </div>
                </div>
                {[
                    {
                        title: "1. Legal Compliance Statement",
                        content: (
                            <>
                                <p>
                                    This Privacy Policy is published in accordance with:
                                </p>
                                <ul>
                                    <li>Section 43A of the Information Technology Act, 2000</li>
                                    <li>Applicable Rules thereunder</li>
                                    <li>The Digital Personal Data Protection Act, 2023</li>
                                </ul>
                                <p>
                                    Ticketmap is committed to lawful, transparent, and minimal data processing.
                                </p>
                            </>
                        ),
                    },
                    {
                        title: "2. Nature of Services",
                        content: (
                            <>
                                <p>
                                    Ticketmap is an independent information platform providing:
                                </p>
                                <ul>
                                    <li>Retailer/shop listing information</li>
                                    <li>Ticket availability information</li>
                                    <li>Public draw schedules</li>
                                    <li>Public lottery results</li>
                                </ul>
                                <ul>
                                    <li>❌ Does NOT sell lottery tickets</li>
                                    <li>❌ Does NOT process prize claims</li>
                                    <li>❌ Does NOT guarantee winnings</li>
                                    <li>❌ Does NOT promote gambling</li>
                                </ul>
                            </>
                        ),
                    },
                    {
                        title: "3. Categories of Personal Data Collected",
                        content: (
                            <>
                                <p><strong>A. Personal Data (if voluntarily provided)</strong></p>
                                <ul>
                                    <li>Name</li>
                                    <li>Phone number</li>
                                    <li>Email address</li>
                                    <li>District/Location (if permission granted)</li>
                                </ul>

                                <p><strong>B. Retailer Data</strong></p>
                                <ul>
                                    <li>Shop name</li>
                                    <li>Business contact details</li>
                                    <li>Ticket availability data</li>
                                </ul>

                                <p><strong>C. Technical & Usage Data</strong></p>
                                <ul>
                                    <li>IP address</li>
                                    <li>Device information</li>
                                    <li>Browser type</li>
                                    <li>Log files</li>
                                    <li>App interaction data</li>
                                </ul>

                                <p>
                                    We do not collect sensitive personal data such as financial passwords,
                                    biometric data, or government IDs unless legally required.
                                </p>
                            </>
                        ),
                    },
                    {
                        title: "4. Lawful Basis of Processing",
                        content: (
                            <ul>
                                <li>User provides explicit consent</li>
                                <li>Processing necessary for service delivery</li>
                                <li>Required under legal obligation</li>
                                <li>Legitimate operational purposes</li>
                            </ul>
                        ),
                    },
                    {
                        title: "5. Purpose of Data Processing",
                        content: (
                            <ul>
                                <li>Providing retailer discovery services</li>
                                <li>Displaying ticket-related information</li>
                                <li>Customer support</li>
                                <li>Subscription management</li>
                                <li>Security monitoring</li>
                                <li>Legal compliance</li>
                            </ul>
                        ),
                    },
                    {
                        title: "6. Data Retention Policy",
                        content: (
                            <ul>
                                <li>Retained only as long as necessary</li>
                                <li>As required under Indian law</li>
                                <li>Until account deletion request</li>
                            </ul>
                        ),
                    },
                    {
                        title: "7. Data Sharing & Disclosure",
                        content: (
                            <ul>
                                <li>With government authorities upon lawful request</li>
                                <li>With payment gateways (if subscription used)</li>
                                <li>With technical service providers</li>
                            </ul>
                        ),
                    },
                    {
                        title: "8. User Rights",
                        content: (
                            <ul>
                                <li>Access personal data</li>
                                <li>Correct inaccurate information</li>
                                <li>Withdraw consent</li>
                                <li>Request deletion</li>
                                <li>File grievance</li>
                            </ul>
                        ),
                    },
                    {
                        title: "9. Data Security Measures",
                        content: (
                            <ul>
                                <li>SSL encryption</li>
                                <li>Secure server hosting</li>
                                <li>Restricted access controls</li>
                                <li>Regular monitoring</li>
                            </ul>
                        ),
                    },
                    {
                        title: "10. Children’s Privacy",
                        content: (
                            <p>
                                Ticketmap is intended only for individuals aged 18 years or above.
                            </p>
                        ),
                    },
                    {
                        title: "11. Amendments",
                        content: (
                            <p>
                                This Privacy Policy may be updated periodically.
                                Continued use of the platform constitutes acceptance of revised policy.
                            </p>
                        ),
                    },
                ].map((section, index) => (
                    <div
                        key={index}
                        style={{
                            background: "#ffffff",
                            padding: "25px",
                            borderRadius: "12px",
                            marginBottom: "25px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h4
                            style={{
                                color: "#dc2626",
                                fontWeight: "600",
                                marginBottom: "15px",
                            }}
                        >
                            {section.title}
                        </h4>
                        <div style={{ color: "#374151", fontSize: "15px", lineHeight: "1.8" }}>
                            {section.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrivacyPolicy;