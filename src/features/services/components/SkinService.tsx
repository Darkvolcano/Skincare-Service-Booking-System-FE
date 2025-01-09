import React from "react";
import { Card, Button, Row, Col, Typography } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const skincareServices = [
  {
    id: 1,
    title: "Liệu trình làm sạch sâu",
    description: "Làm sạch sâu da mặt, loại bỏ bã nhờn và bụi bẩn.",
    price: "$50",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Liệu trình dưỡng trắng da",
    description: "Cải thiện sắc tố da, giúp da sáng và đều màu.",
    price: "$70",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Liệu trình trị mụn",
    description: "Chăm sóc và phục hồi da mụn, giảm thâm.",
    price: "$80",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Liệu trình trẻ hóa da",
    description: "Tăng độ đàn hồi, giảm nếp nhăn và săn chắc da.",
    price: "$100",
    image: "https://via.placeholder.com/150",
  },
];

const SkincareServices: React.FC = () => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        Dịch Vụ Chăm Sóc Da Chuyên Nghiệp
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {skincareServices.map((service) => (
          <Col
            key={service.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            style={{ display: "flex" }}
          >
            <Card
              hoverable
              cover={<img alt={service.title} src={service.image} />}
              actions={[
                <Button type="text" icon={<HeartOutlined />} key="wishlist">
                  Yêu thích
                </Button>,
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  key="book"
                >
                  Đặt ngay
                </Button>,
              ]}
            >
              <Title level={4}>{service.title}</Title>
              <Text>{service.description}</Text>
              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: "#fa541c",
                }}
              >
                {service.price}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SkincareServices;
