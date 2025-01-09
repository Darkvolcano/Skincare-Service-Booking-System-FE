import { Menu, Input, Button, Badge } from "antd";
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../style/Navbar.css";
import { useNavigate } from "react-router-dom";

const CustomNavbarMenu = () => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    if (key === "new-arrivals") {
      navigate("/Homepage/Shoppingpage");
    } else if (key === "all-products") {
      navigate("/Homepage");
    } else if (key === "brands") {
      navigate("/Homepage/Court");
    } else if (key === "blog") {
      navigate("/Homepage/Service");
    } else if (key === "quiz") {
      navigate("/Homepage/QuizTest");
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <ShoppingOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["all-products"]}
          className="navbar-menu"
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item key="all-products">All Products</Menu.Item>
          <Menu.Item key="new-arrivals">New Arrivals</Menu.Item>
          <Menu.Item key="brands">Brands</Menu.Item>
          <Menu.Item key="blog">Blog</Menu.Item>
          <Menu.Item key="quiz">Quiz</Menu.Item>
        </Menu>
      </div>

      {/* <div className="navbar-middle">
        <Input.Search placeholder="Search" style={{ width: 200 }} />
      </div> */}

      <div className="navbar-right">
        <Input.Search placeholder="Search" style={{ width: 200 }} />
        <Button type="link">Đăng nhập</Button>
        <Button type="primary" style={{ marginLeft: "8px" }}>
          Đăng ký
        </Button>
        <Badge count={50} overflowCount={10}>
          <ShoppingCartOutlined
            style={{ fontSize: "24px", marginLeft: "16px" }}
          />
        </Badge>
        <Badge size="small">
          <UserOutlined style={{ fontSize: "24px", marginLeft: "16px" }} />
        </Badge>
      </div>
    </div>
  );
};

export default CustomNavbarMenu;
