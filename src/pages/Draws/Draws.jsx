import { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import { getDrawsSchedule } from "../../services/auth.api";
import { FaCalendarAlt } from "react-icons/fa";

const Draws = () => {

    const [key, setKey] = useState("draws");
    const [drawList, setDrawList] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        fetchDraws();
    }, []);

    const fetchDraws = async () => {
        try {
            const res = await getDrawsSchedule();
            setDrawList(res.data.data || []);
        } catch (error) {
            console.error("Draw schedule fetch error", error);
        }
    };

    const formatTime = (time) => {
        const [h, m] = time.split(":");
        const hour = h % 12 || 12;
        const ampm = h >= 12 ? "PM" : "AM";
        return `${hour}:${m} ${ampm}`;
    };

    const getFilteredDraws = () => {

        if (!drawList.length) return [];

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const draws = drawList
            .map(d => {
                const [h, m] = d.time.split(":");
                return {
                    ...d,
                    minutes: parseInt(h) * 60 + parseInt(m)
                };
            })
            .sort((a, b) => a.minutes - b.minutes);

        // find last draw before current time
        let closedIndex = -1;

        for (let i = draws.length - 1; i >= 0; i--) {
            if (draws[i].minutes <= currentMinutes) {
                closedIndex = i;
                break;
            }
        }

        // if before first draw
        if (closedIndex === -1) {
            return draws.slice(0, 4);
        }

        let result = [draws[closedIndex]];

        let nextIndex = (closedIndex + 1) % draws.length;

        while (result.length < 4) {
            result.push(draws[nextIndex]);
            nextIndex = (nextIndex + 1) % draws.length;
        }

        return result;
    };

    const getStatus = (drawTime) => {

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const [h, m] = drawTime.split(":");
        const drawMinutes = parseInt(h) * 60 + parseInt(m);

        if (drawMinutes === currentMinutes) return "current";

        if (drawMinutes < currentMinutes) return "closed";

        return "upcoming";
    };

    return (
        <Container fluid className="draw-page">
            <Row>
                <Col>
                    <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
                        <div className="draw-tabs-wrapper">
                            <Nav className="draw-tabs">
                                <Nav.Item>
                                    <Nav.Link eventKey="draws">Upcoming</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="results">Results</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <div className="calendar-btn" onClick={() => document.getElementById("drawCalendar").showPicker()}>
                                <FaCalendarAlt />

                                <input
                                    type="date"
                                    id="drawCalendar"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>

                        <Tab.Content>
                            <Tab.Pane eventKey="draws">
                                <div className="timeline">
                                    {drawList.length > 0 ? (
                                        drawList?.map((item, index) => {

                                            let status = "upcoming";

                                            if (index === 0) status = "closed";

                                            const now = new Date();
                                            const currentMinutes = now.getHours() * 60 + now.getMinutes();

                                            const [h, m] = item.time.split(":");
                                            const drawMinutes = parseInt(h) * 60 + parseInt(m);

                                            if (drawMinutes === currentMinutes) {
                                                status = "current";
                                            }

                                            return (
                                                <div className="draw-card" key={item.id}>

                                                    <div className={`timeline-dot ${status}`}></div>

                                                    <div className="date-box">
                                                        <span>Draw</span>
                                                        <b>{item.id}</b>
                                                    </div>

                                                    <div className="draw-info">

                                                        <div className="draw-header">
                                                            <h6>{item.name}</h6>

                                                            {status === "current" && (
                                                                <span className="status current">Current</span>
                                                            )}

                                                            {status === "closed" && (
                                                                <span className="status closed">Closed</span>
                                                            )}

                                                            {status === "upcoming" && (
                                                                <span className="status upcoming">Upcoming</span>
                                                            )}

                                                        </div>

                                                        <p>{formatTime(item.time)}</p>

                                                    </div>

                                                </div>
                                            );

                                        })
                                    ) : (
                                        <p>No Draw Schedule Found</p>
                                    )}
                                </div>

                            </Tab.Pane>
                            <Tab.Pane eventKey="results">
                                <p>Result list will come here</p>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>

            {/* CSS */}
            <style>{`

            .draw-page{
                margin:auto;
                padding:15px;
                background:#f4f5fb;
                min-height:100vh;
            }

            .draw-tabs-wrapper{
            display:flex;
            align-items:center;
            justify-content:space-between;
            margin-bottom:15px;
            }

          .draw-tabs{
          background:#e9e9ef;
          padding:4px;
          border-radius:30px;
          display:flex;
          gap:5px;
          }

            .draw-tabs .nav-link{
                border-radius:20px;
                font-size:14px;
                text-align:center;
            }

            .draw-tabs .nav-link.active{
                background:white;
                font-weight:600;
            }
                .calendar-btn{
background:#fff;
padding:8px;
border-radius:10px;
box-shadow:0 2px 8px rgba(0,0,0,0.08);
color:#4f7cff;
font-size:18px;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
}

            .timeline{
                position:relative;
                padding-left:30px;
                border-left:3px solid #cfd3f5;
            }

            .draw-card{
                position:relative;
                display:flex;
                background:white;
                border-radius:14px;
                padding:12px;
                margin-bottom:18px;
                box-shadow:0 3px 10px rgba(0,0,0,0.05);
            }

         .timeline-dot{
width:12px;
height:12px;
border-radius:50%;
position:absolute;
left:-37px;
top:20px;
}

.timeline-dot.current{
background:#2ecc71;
}

.timeline-dot.upcoming{
background:#3498db;
}

.timeline-dot.closed{
background:#e74c3c;
}

.status.open{
background:#2ecc71;
}

.status.upcoming{
background:#3498db;
}

.status.closed{
background:#e74c3c;
            }

            .date-box{
                width:70px;
                text-align:center;
                background:#f2f3fb;
                border-radius:10px;
                padding:8px;
                font-size:12px;
            }

            .date-box span{
                display:block;
                color:#666;
            }

            .date-box b{
                font-size:16px;
            }

            .draw-info{
                flex:1;
                padding-left:12px;
            }

            .draw-header{
                display:flex;
                justify-content:space-between;
                align-items:center;
            }

            .draw-header h6{
                margin:0;
                font-size:14px;
                font-weight:600;
            }

            .status{
                background:#4f7cff;
                color:white;
                padding:4px 8px;
                border-radius:6px;
                font-size:11px;
            }

            .draw-info p{
                margin:4px 0;
                font-size:13px;
                color:#666;
            }

            .sales-box{
                margin-top:8px;
                background:#ffe9d6;
                border-radius:8px;
                padding:6px 8px;
                display:flex;
                justify-content:space-between;
                align-items:center;
                font-size:12px;
            }

            .sales-box button{
                border:none;
                background:#4f7cff;
                color:white;
                padding:4px 10px;
                border-radius:6px;
                font-size:11px;
            }

            @media(max-width:600px){

                .draw-page{
                    padding:10px;
                }

                .draw-card{
                    padding:10px;
                }

                .draw-header h6{
                    font-size:13px;
                }

            }

            `}</style>

        </Container>
    );
};

export default Draws;