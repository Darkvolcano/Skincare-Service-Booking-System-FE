import { Typography, Divider, Row, Col } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

const { Title } = Typography;

const StaffPage = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm:ss"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        textAlign: "center",
        padding: 20,
      }}
    >
      <Title level={2}>Xin Chào, Staff</Title>
      <Divider />

      {/* <Card
        style={{ borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
      > */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Doctor"
        style={{ width: 180, height: 180, borderRadius: 10 }}
      />
      {/* </Card> */}

      <Divider />

      <Row justify="center">
        <Col>
          <Title style={{ fontSize: 70 }}>{currentTime}</Title>
        </Col>
      </Row>
    </div>
  );
};

export default StaffPage;
