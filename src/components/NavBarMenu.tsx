import { Menu, Button, Badge } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "../style/Navbar.css";
import { Outlet, useNavigate } from "react-router-dom";
import { PagePath } from "../enums/page-path.enum";
import { Content } from "antd/es/layout/layout";
import Footers from "./Footer";

const NavbarMenu = () => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    if (key === "new-arrivals") {
      navigate("/Homepage/Shoppingpage");
    } else if (key === "service") {
      navigate("/Homepage");
    } else if (key === "blog") {
      navigate("/Homepage/Blog");
    } else if (key === "quiz") {
      navigate("/Homepage/QuizTest");
    } else if (key === "skin-therapist") {
      navigate("/Homepage/SkinTherapist");
    } else if (key === "price") {
      navigate("/Homepage/Price");
    } else if (key === "home") {
      navigate("/Homepage/Main");
    }
  };

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            className="navbar-menu"
            onClick={({ key }) => handleMenuClick(key)}
          >
            <Menu.Item key="home">Trang chủ</Menu.Item>
            <Menu.Item key="service">Dịch vụ</Menu.Item>
            <Menu.Item key="blog">Blog</Menu.Item>
            <Menu.Item key="quiz">Bài trắc nghiệm</Menu.Item>
            <Menu.Item key="skin-therapist">Chuyên viên trị liệu da</Menu.Item>
            <Menu.Item key="price">Bảng giá</Menu.Item>
          </Menu>
        </div>

        <div className="navbar-middle">
          {/* <Menu
            mode="horizontal"
            defaultSelectedKeys={["service"]}
            className="navbar-menu"
            onClick={({ key }) => handleMenuClick(key)}
          >
            <Menu.Item key="service">Dịch vụ</Menu.Item>
            <Menu.Item key="blog">Blog</Menu.Item>
            <Menu.Item key="quiz">Bài trắc nghiệm</Menu.Item>
            <Menu.Item key="skin-therapist">Chuyên viên trị liệu da</Menu.Item>
            <Menu.Item key="price">Bảng giá</Menu.Item>
          </Menu> */}
        </div>

        <div className="navbar-right">
          {/* <Input.Search placeholder="Search" style={{ width: 200 }} /> */}
          <Button type="link" onClick={() => navigate(PagePath.LOGIN)}>
            Đăng nhập
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: "8px" }}
            onClick={() => navigate(PagePath.REGISTER)}
          >
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
      <Content style={{ padding: "31px 48px", background: "#FBFEFB" }}>
        <Outlet />
      </Content>
      <Footers />
    </>
  );
};

export default NavbarMenu;
