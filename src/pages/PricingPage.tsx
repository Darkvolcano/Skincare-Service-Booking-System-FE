import { Card, Col, Row, Typography, Button, Tag } from "antd";
import styles from "./PricingTable.module.css";

const { Title, Paragraph } = Typography;

type PricingPlan = {
  title: string;
  price: string;
  description: string;
  features: string[];
  tag?: string;
  isPopular?: boolean;
};

const pricingPlans: PricingPlan[] = [
  {
    title: "Basic Care",
    price: "500,000 VND",
    description: "Dịch vụ chăm sóc da cơ bản phù hợp với mọi loại da.",
    features: ["Làm sạch sâu", "Dưỡng ẩm da", "Massage thư giãn 20 phút"],
    tag: "HSSV",
  },
  {
    title: "Premium Care",
    price: "1,000,000 VND",
    description: "Dịch vụ cao cấp dành riêng cho da khô và nhạy cảm.",
    features: [
      "Làm sạch sâu",
      "Dưỡng chất collagen",
      "Thải độc da chuyên sâu",
      "Massage thư giãn 30 phút",
    ],
    isPopular: true,
  },
  {
    title: "Luxury Care",
    price: "2,500,000 VND",
    description: "Dịch vụ VIP dành cho khách hàng muốn trải nghiệm tốt nhất.",
    features: [
      "Làm sạch và trẻ hóa làn da",
      "Dưỡng chất vàng 24k",
      "Thải độc da nâng cao",
      "Massage thư giãn 60 phút",
      "Tư vấn chuyên sâu 1:1",
    ],
  },
];

const PricingTable = () => {
  return (
    <div className={styles.container}>
      <Title level={2} className={styles.heading}>
        Bảng Giá Dịch Vụ Chăm Sóc Da
      </Title>
      <Paragraph className={styles.subheading}>
        Chọn gói dịch vụ phù hợp với nhu cầu của bạn và tận hưởng làn da khỏe
        mạnh!
      </Paragraph>
      <Row gutter={[16, 16]} justify="center">
        {pricingPlans.map((plan, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              className={`${styles.card} ${
                plan.isPopular ? styles.popular : ""
              }`}
              hoverable
            >
              <div className={styles.header}>
                <Title level={4}>{plan.title}</Title>
                {plan.tag && <Tag color="blue">{plan.tag}</Tag>}
                {plan.isPopular && (
                  <Tag color="gold" className={styles.popularTag}>
                    Phổ Biến
                  </Tag>
                )}
              </div>
              <Title level={3} className={styles.price}>
                {plan.price}
              </Title>
              <Paragraph>{plan.description}</Paragraph>
              <ul className={styles.features}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button type="primary" block>
                Đặt Dịch Vụ
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PricingTable;
