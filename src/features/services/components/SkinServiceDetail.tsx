import {
  Card,
  Typography,
  Row,
  Col,
  Image,
  Button,
  Divider,
  List,
  Tag,
  Avatar,
} from "antd";
import {
  ClockCircleOutlined,
  DollarOutlined,
  CheckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

const ServiceDetail = () => {
  const { id } = useParams();

  const serviceDetail = {
    id: id,
    title: "Liệu trình làm sạch sâu",
    description:
      "Làm sạch sâu da mặt, loại bỏ bã nhờn và bụi bẩn, giúp da sáng khỏe và thông thoáng.",
    image: "https://via.placeholder.com/400",
    duration: "60 phút",
    price: "$50",
    benefits: [
      "Làm sạch sâu lỗ chân lông",
      "Giảm bã nhờn và mụn đầu đen",
      "Cải thiện độ sáng và đều màu da",
      "Chuẩn bị da hấp thụ dưỡng chất tốt hơn",
    ],
    steps: [
      "Làm sạch bề mặt da",
      "Tẩy tế bào chết nhẹ nhàng",
      "Xông hơi và làm sạch sâu lỗ chân lông",
      "Đắp mặt nạ làm dịu da",
      "Dưỡng ẩm và bảo vệ da",
    ],
    therapists: [
      {
        name: "Nguyễn Thị A",
        experience: "5 năm kinh nghiệm",
        avatar: "https://via.placeholder.com/100",
      },
      {
        name: "Trần Văn B",
        experience: "3 năm kinh nghiệm",
        avatar: "https://via.placeholder.com/100",
      },
    ],
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#FBFEFB" }}>
      <Card
        style={{
          maxWidth: 1200,
          margin: "20px auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        bodyStyle={{ padding: 24 }}
      >
        <Row gutter={24}>
          <Col xs={24} md={10}>
            <Image
              src={serviceDetail.image}
              alt={serviceDetail.title}
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} md={14}>
            <Title level={2} style={{ marginBottom: 16 }}>
              {serviceDetail.title}
            </Title>
            <Text style={{ fontSize: 16, color: "#555" }}>
              {serviceDetail.description}
            </Text>
            <Divider />
            <div style={{ marginBottom: 16 }}>
              <ClockCircleOutlined
                style={{ color: "#fa541c", marginRight: 8 }}
              />
              <Text strong>Thời gian:</Text> {serviceDetail.duration}
            </div>
            <div style={{ marginBottom: 16 }}>
              <DollarOutlined style={{ color: "#52c41a", marginRight: 8 }} />
              <Text strong>Giá:</Text> {serviceDetail.price}
            </div>
            <Button type="primary" size="large" style={{ marginTop: 20 }}>
              Đặt lịch ngay
            </Button>
          </Col>
        </Row>

        <Divider style={{ margin: "40px 0" }}>Lợi ích</Divider>
        <List
          dataSource={serviceDetail.benefits}
          renderItem={(benefit) => (
            <List.Item>
              <CheckOutlined style={{ color: "#52c41a", marginRight: 8 }} />
              {benefit}
            </List.Item>
          )}
        />

        <Divider style={{ margin: "40px 0" }}>Quy trình thực hiện</Divider>
        <List
          dataSource={serviceDetail.steps}
          renderItem={(step, index) => (
            <List.Item>
              <Tag color="blue">Bước {index + 1}</Tag>
              {step}
            </List.Item>
          )}
        />

        <Divider style={{ margin: "40px 0" }}>Chuyên viên trị liệu</Divider>
        <Row gutter={[16, 16]}>
          {serviceDetail.therapists.map((therapist) => (
            <Col xs={24} sm={12} md={8} key={therapist.name}>
              <Card style={{ textAlign: "center" }}>
                <Avatar
                  src={therapist.avatar}
                  size={80}
                  icon={<UserOutlined />}
                  style={{ marginBottom: 16 }}
                />
                <Title level={5}>{therapist.name}</Title>
                <Text>{therapist.experience}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default ServiceDetail;
