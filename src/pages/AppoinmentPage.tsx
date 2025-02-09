import React, { useState } from "react";
import { Card, Tabs, Checkbox, Typography, Row, Col, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface Booking {
  id: number;
  name: string;
  room: string;
  time: string;
  status: "Booked" | "Checked-in";
}

const initialBookings: Booking[] = [
  {
    id: 1,
    name: "Nguyen Van A",
    room: "101",
    time: "10:00 AM",
    status: "Booked",
  },
  {
    id: 2,
    name: "Tran Thi B",
    room: "102",
    time: "11:00 AM",
    status: "Checked-in",
  },
  { id: 3, name: "Le Van C", room: "103", time: "01:00 PM", status: "Booked" },
];

const AppoinmentPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const today = dayjs().format("YYYY-MM-DD");

  const handleCheckin = (id: number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Checked-in" } : b))
    );
    message.success("Khách hàng đã check-in thành công!");
  };

  const handleCheckout = (id: number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Checked-out" } : b))
    );
    message.success("Khách hàng đã check-out thành công!");
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Check-in" key="1">
        <Row gutter={[16, 16]}>
          {bookings
            .filter((b) => b.status === "Booked")
            .map((booking) => (
              <Col span={8} key={booking.id}>
                <Card>
                  <Row justify="space-between">
                    <Col>
                      <Title level={4}>
                        {booking.name}{" "}
                        {booking.status === "Checked-in" && (
                          <CheckCircleOutlined style={{ color: "green" }} />
                        )}
                      </Title>
                      <Text>Room: {booking.room}</Text>
                      <br />
                      <Text>Time: {booking.time}</Text>
                    </Col>
                    <Col>
                      <Checkbox onChange={() => handleCheckin(booking.id)}>
                        Check-in
                      </Checkbox>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
        </Row>
      </TabPane>
      <TabPane tab="Check-out" key="2">
        <Row gutter={[16, 16]}>
          {bookings
            .filter((b) => b.status === "Checked-in")
            .map((booking) => (
              <Col span={8} key={booking.id}>
                <Card>
                  <Row justify="space-between">
                    <Col>
                      <Title level={4}>{booking.name}</Title>
                      <Text>Room: {booking.room}</Text>
                      <br />
                      <Text>Time: {booking.time}</Text>
                    </Col>
                    <Col>
                      <Checkbox onChange={() => handleCheckout(booking.id)}>
                        Check-out
                      </Checkbox>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
        </Row>
      </TabPane>
    </Tabs>
  );
};

export default AppoinmentPage;
