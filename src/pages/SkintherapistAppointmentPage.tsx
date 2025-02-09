import { useState } from "react";
import { Card, Typography, Row, Col, Button, message } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface Booking {
  id: number;
  name: string;
  room: string;
  time: string;
  status: "Booked" | "Checked-in" | "Checked-out" | "In Progress";
  therapist: string;
}

const initialBookings: Booking[] = [
  {
    id: 1,
    name: "Nguyen Van A",
    room: "101",
    time: "10:00 AM",
    status: "Checked-in",
    therapist: "Dr. John",
  },
  {
    id: 2,
    name: "Tran Thi B",
    room: "102",
    time: "11:00 AM",
    status: "Checked-in",
    therapist: "Dr. Lisa",
  },
  {
    id: 3,
    name: "Le Van C",
    room: "103",
    time: "01:00 PM",
    status: "Booked",
    therapist: "Dr. Mark",
  },
];

const SkinTherapistAppoinmentPage = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const handleStartTreatment = (id: number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "In Progress" } : b))
    );
    message.success("Quá trình trị liệu bắt đầu!");
  };

  return (
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
                  <br />
                  <Text>Therapist: {booking.therapist}</Text>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={() => handleStartTreatment(booking.id)}
                  >
                    Bắt đầu làm
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default SkinTherapistAppoinmentPage;
