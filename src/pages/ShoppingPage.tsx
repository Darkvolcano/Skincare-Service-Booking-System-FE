import { Card, Row, Col, Button, Typography } from "antd";
import { Product } from "../models/product.model";
import "../style/Product.css";

const { Title, Text } = Typography;

const products: Product[] = [
  {
    id: 1,
    name: "Apple",
    image: "/images/apple.jpg",
    originalPrice: 30,
    discountedPrice: 25,
  },
  {
    id: 2,
    name: "Banana",
    image: "/images/banana.jpg",
    originalPrice: 30,
    discountedPrice: 25,
  },
  {
    id: 3,
    name: "Chocolate Cookies",
    image: "/images/cookies.jpg",
    originalPrice: 30,
    discountedPrice: 25,
  },
  {
    id: 4,
    name: "Chocolate Spread",
    image: "/images/spread.jpg",
    originalPrice: 30,
    discountedPrice: 25,
  },
  {
    id: 5,
    name: "Cooling Oil",
    image: "/images/oil.jpg",
    originalPrice: 30,
    discountedPrice: 25,
  },
  {
    id: 6,
    name: "Easter-Bread",
    image: "/images/bread.jpg",
    originalPrice: 30,
    discountedPrice: 25,
  },
];

const ProductList = () => {
  return (
    <div className="product-list-container">
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.image}
                  className="product-image"
                />
              }
              className="product-card"
            >
              <Title level={5}>{product.name}</Title>
              <div className="price-container">
                <Text delete>${product.originalPrice}</Text>
                <Text strong style={{ marginLeft: 8, color: "#1890ff" }}>
                  ${product.discountedPrice}
                </Text>
              </div>
              <Button type="primary" block style={{ marginTop: 8 }}>
                Add to Cart
              </Button>
            </Card>
          </Col>
        ))}

        {/* Promotional Banners */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="promo-card">
            <Title level={4} style={{ color: "#ff4d4f" }}>
              Don't Miss It
            </Title>
            <Text>30% Sale</Text>
            <Text>On Coffee Products</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="promo-card">
            <Title level={4} style={{ color: "#ffa940" }}>
              10% Sale
            </Title>
            <Text>On Packed Fruits</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
