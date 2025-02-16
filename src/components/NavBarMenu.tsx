import { Menu, Button, Badge, Dropdown } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import "../style/Navbar.css";
import { Outlet, useNavigate } from "react-router-dom";
import { PagePath } from "../enums/page-path.enum";
import { Content } from "antd/es/layout/layout";
import Footers from "./Footer";
import useAuthStore from "../features/authentication/hooks/useAuthStore";

const NavbarMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleMenuClick = (key: string) => {
    if (key === "new-arrivals") {
      navigate("/Homepage/Shoppingpage");
    } else if (key === "service") {
      navigate("/Homepage/Service");
    } else if (key === "blog") {
      navigate("/Homepage/Blog");
    } else if (key === "skin-therapist") {
      navigate("/Homepage/SkinTherapist");
    } else if (key === "price") {
      navigate("/Homepage/Price");
    } else if (key === "home") {
      navigate("/Homepage/Main");
    } else if (key === "staff") {
      navigate("/Staff/Appointment");
    } else if (key === "therapist") {
      navigate("/Skin_Therapist/Appointment");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleMenu = (key: string) => {
    if (key === "account") {
      navigate("/Home/Profile");
    } else if (key === "logout") {
      navigate("/");
      logout();
    }
  };

  const accountMenu = (
    <Menu onClick={({ key }) => handleMenu(key)}>
      <Menu.Item key="account" icon={<UserOutlined />}>
        Thông tin tài khoản
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => handleLogout()}
        style={{ color: "red" }}
      >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

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
            {user?.role === "Customer" && (
              <>
                <Menu.Item key="home">Trang chủ</Menu.Item>
                <Menu.Item key="service">Dịch vụ</Menu.Item>
                <Menu.Item key="blog">Blog</Menu.Item>
                <Menu.Item key="skin-therapist">
                  Chuyên viên trị liệu da
                </Menu.Item>
                <Menu.Item key="price">Bảng giá</Menu.Item>
              </>
            )}
            {user?.role === "Staff" && (
              <Menu.Item key="staff">Trang làm việc</Menu.Item>
            )}
            {user?.role === "Therapist" && (
              <Menu.Item key="therapist">Trang làm việc</Menu.Item>
            )}
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
          {/* <Button type="link" onClick={() => navigate(PagePath.LOGIN)}>
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
          </Badge> */}
          {!user ? (
            <>
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
            </>
          ) : (
            // Display user icon and accountName if logged in
            <>
              <span style={{ marginRight: "8px" }}>{user.username}</span>
              <Dropdown overlay={accountMenu}>
                <Badge size="small">
                  <UserOutlined
                    style={{ fontSize: "24px", marginLeft: "16px" }}
                  />
                </Badge>
              </Dropdown>
            </>
          )}
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
