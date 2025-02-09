import { useState } from "react";
import {
  Card,
  Typography,
  Row,
  Col,
  Calendar,
  Badge,
  Button,
  Space,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import type { BadgeProps } from "antd";
import { Dayjs } from "dayjs";

const { Title, Text } = Typography;

interface CalendarEvent {
  type: string;
  content: string;
}

const skincareExperts = [
  {
    id: 1,
    name: "Nguyễn Thị Hồng",
    expertise: "Chăm sóc da mụn",
    availableHours: ["10:00", "13:00", "16:00"],
    profilePicture: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Lê Văn Khánh",
    expertise: "Chăm sóc trẻ hóa da",
    availableHours: ["09:00", "12:00", "15:00"],
    profilePicture: "https://via.placeholder.com/100",
  },
];

const SkincareBooking = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const getListData = (value: Dayjs): CalendarEvent[] => {
    const date = value.format("YYYY-MM-DD");
    if (date === "2025-01-14") {
      return [
        { type: "success", content: "Nguyễn Thị Hồng - 10:00" },
        { type: "warning", content: "Lê Văn Khánh - 09:00" },
      ];
    }
    return [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const handleSelectExpert = (id: number, time: string) => {
    setSelectedExpert(id);
    setSelectedTime(time);
  };

  return (
    <div>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        Đặt Lịch Chăm Sóc Da
      </Title>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={18}>
          <Card title="Lịch làm việc" bordered={false}>
            <Calendar
              cellRender={dateCellRender}
              onSelect={(value) => setSelectedDate(value.format("YYYY-MM-DD"))}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card title="Thông tin chuyên viên" bordered={false}>
            {selectedDate && (
              <div>
                <Text strong style={{ fontSize: "16px" }}>
                  Ngày đã chọn: {selectedDate}
                </Text>
                <div style={{ marginTop: "20px" }}>
                  {skincareExperts.map((expert) => (
                    <Card
                      key={expert.id}
                      style={{
                        marginBottom: "10px",
                        backgroundColor: "#f0f2f5",
                      }}
                      hoverable
                    >
                      <Row align="middle">
                        <Col>
                          <img
                            src={expert.profilePicture}
                            alt={expert.name}
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "50%",
                            }}
                          />
                          <Title level={4}>{expert.name}</Title>
                          <Text>{expert.expertise}</Text>
                          <div style={{ marginTop: "10px" }}>
                            <Space>
                              {expert.availableHours.map((time) => (
                                <Button
                                  key={time}
                                  type={
                                    selectedExpert === expert.id &&
                                    selectedTime === time
                                      ? "primary"
                                      : "default"
                                  }
                                  onClick={() =>
                                    handleSelectExpert(expert.id, time)
                                  }
                                >
                                  {time}
                                </Button>
                              ))}
                            </Space>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {selectedExpert && (
              <div style={{ marginTop: "20px" }}>
                <Title level={4}>Xác nhận đặt lịch</Title>
                <Text>
                  Bạn đã chọn{" "}
                  <strong>
                    {skincareExperts.find((e) => e.id === selectedExpert)?.name}
                  </strong>{" "}
                  vào lúc <strong>{selectedTime}</strong> ngày{" "}
                  <strong>{selectedDate}</strong>.
                </Text>
                <div style={{ marginTop: "20px" }}>
                  <Button type="primary" icon={<CheckCircleOutlined />}>
                    Xác nhận
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SkincareBooking;
