// import { useState, useEffect } from "react";
// import {
//   HomeOutlined,
//   AppstoreOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   BellFilled,
//   UserOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import {
//   Breadcrumb,
//   Layout,
//   Menu,
//   Button,
//   message,
//   Dropdown,
//   Modal,
//   Popover,
// } from "antd";
// import { Pie } from "@ant-design/charts";
// import { Link, useLocation, Outlet } from "react-router-dom";
// import "../src/css/Home.css";
// import useAuthStore from "./features/authentication/hooks/authStore";
// import { useNavigate } from "react-router-dom";
// import { PagePath } from "./enums/page-path.enum";

// const { Header, Content, Sider } = Layout;

// const items2 = [
//   {
//     key: "1",
//     icon: <HomeOutlined />,
//     label: <Link to={PagePath.HOME}>Trang chủ</Link>,
//   },
//   {
//     key: "2",
//     icon: <AppstoreOutlined />,
//     label: "Thanh toán",
//     children: [
//       {
//         key: PagePath.WORK_VOLUME,
//         label: <Link to={PagePath.WORK_VOLUME}>Bảng khối lượng</Link>,
//       },
//       {
//         key: PagePath.APPROVAL_VOLUME,
//         label: (
//           <Link to={PagePath.APPROVAL_VOLUME}>Phê duyệt bảng khối lượng</Link>
//         ),
//       },
//       {
//         key: PagePath.USER,
//         label: <Link to={PagePath.USER}>Người dùng</Link>,
//       },
//       {
//         key: "/Home/Mac",
//         label: <Link to="/Home/Mac">Mac address of access point</Link>,
//       },
//     ],
//   },
//   // {
//   //   key: "3",
//   //   icon: <AppstoreOutlined />,
//   //   label: "Quản lý vật tư/ thiết bị",
//   //   children: [
//   //     { key: "3-1", label: "Xác nhận" },
//   //     { key: "3-2", label: "Duyệt" },
//   //     { key: "3-3", label: "Xuất /Nhập kho" },
//   //     { key: "3-4", label: "Danh sách yêu cầu" },
//   //     { key: "3-5", label: "Báo cáo cấp phát" },
//   //   ],
//   // },
//   // {
//   //   key: "4",
//   //   icon: <AppstoreOutlined />,
//   //   label: "Quản lý tài khoản",
//   //   children: [{ key: "4-1", label: "Danh sách tài khoản" }],
//   // },
// ];

// // const languageMenu = (
// //   <Menu className="language">
// //     <Menu.Item key="1">Tiếng Việt</Menu.Item>
// //     <Menu.Item key="2">English</Menu.Item>
// //   </Menu>
// // );
// const data = [
//   {
//     type: "Quản lý",
//     value: 27,
//   },
//   {
//     type: "Nhân viên",
//     value: 25,
//   },
//   {
//     type: "Chuyên viên chăm sóc da",
//     value: 18,
//   },
//   {
//     type: "Người dùng",
//     value: 15,
//   },
//   {
//     type: "Tiếp viên",
//     value: 10,
//   },
//   {
//     type: "Bảo vệ",
//     value: 5,
//   },
// ];
// const config = {
//   forceFit: true,
//   title: {
//     visible: true,
//     text: "Thống kê số lượng",
//   },
//   description: {
//     visible: true,
//     text: "Số lượng của từng role",
//   },
//   radius: 0.8,
//   data,
//   angleField: "value",
//   colorField: "type",
//   label: {
//     visible: true,
//     type: "outer",
//     offset: 20,
//   },
// };

// const notificationContent = (
//   <div>
//     <p>Chưa có thông báo</p>
//     <BellFilled
//       style={{
//         fontSize: "25px",
//         display: "block",
//         cursor: "pointer",
//       }}
//     />
//   </div>
// );

// const Home = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [username, setUsername] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const location = useLocation(); // Get current path
//   const navigate = useNavigate();

//   const { accessToken, user, logout } = useAuthStore();
//   // const username = user?.username;

//   useEffect(() => {
//     document.title = "Trang chủ";
//   }, []);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       if (!accessToken || !user) return;

//       try {
//         const response = await fetch(
//           `https://dev.ddc.fis.vn/econstruction_api/users/get_one?username=${user.username}`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         const data = await response.json();

//         console.log("User Details API Response:", data);

//         if (data.statusCode === 1 && data.data.length > 0) {
//           setUsername(data.data[0].username);
//         } else {
//           message.error("Failed to fetch user details");
//         }
//       } catch (error) {
//         message.error(
//           "Error fetching user details: " + (error as Error).message
//         );
//       }
//     };

//     fetchUserDetails();
//   }, [accessToken, user]);

//   // const showModal = () => {
//   //   setIsModalVisible(true);
//   // };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const handleMenu = (key: string) => {
//     if (key === "account") {
//       navigate("/Home/Profile");
//     } else if (key === "logout") {
//       navigate("/");
//     }
//   };

//   const accountMenu = (
//     <Menu onClick={({ key }) => handleMenu(key)}>
//       <Menu.Item key="account" icon={<UserOutlined />}>
//         Thông tin tài khoản
//       </Menu.Item>
//       <Menu.Item
//         key="logout"
//         icon={<LogoutOutlined />}
//         onClick={() => handleLogout()}
//         style={{ color: "red" }}
//       >
//         Đăng xuất
//       </Menu.Item>
//     </Menu>
//   );

//   const isHomePage = location.pathname === "/home";

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//         style={{
//           // background: "#fff",
//           backgroundColor: "rgb(242 245 248 / 1)",
//           marginTop: "64px",
//         }}
//       >
//         <Menu
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           style={{
//             height: "100%",
//             borderRight: 0,
//           }}
//           items={items2}
//           className="bg-light-109"
//         />
//       </Sider>

//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: "#fff",
//             display: "flex",
//             alignItems: "center",
//             width: "100%",
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             zIndex: 1,
//             borderBottom: "1px solid #EBEFF5",
//           }}
//         >
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: "16px",
//               width: 64,
//               height: 64,
//               border: "none",
//               outline: "none",
//             }}
//           />
//           {/* <img
//             src="https://dev.ddc.fis.vn/econstruction_web_client/assets/logo-ctc-horizontal-BCKyPDAh.png"
//             style={{ width: "120px", marginLeft: "10px" }}
//             alt="logo"
//           /> */}
//           {/* <img
//             src="https://cdn.fpt-is.com/vi/FPT-IS-set-logo-08-1715516291.svg"
//             style={{ width: "120px", marginLeft: "10px" }}
//             alt="logo"
//           /> */}

//           <div
//             style={{
//               marginLeft: "auto",
//               display: "flex",
//               alignItems: "center",
//               marginRight: "20px",
//             }}
//           >
//             <Popover
//               content={notificationContent}
//               trigger="hover"
//               placement="bottomRight"
//             >
//               <BellFilled
//                 style={{
//                   fontSize: "25px",
//                   marginRight: "20px",
//                   cursor: "pointer",
//                 }}
//               />
//             </Popover>
//             {/* <Text
//               style={{
//                 marginRight: "20px",
//                 color: "#1890ff",
//                 cursor: "pointer",
//               }}
//               onClick={showModal}
//             >
//               Quy định
//             </Text> */}

//             <Dropdown overlay={accountMenu}>
//               <span
//                 style={{
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 {/* <Avatar
//                   style={{ backgroundColor: "#87d068", marginRight: "10px" }}
//                   icon={<UserOutlined />}
//                 /> */}
//                 <img
//                   src="https://joesch.moe/api/v1/male/random?key=1"
//                   style={{
//                     marginRight: "10px",
//                     width: "40px", // Set width
//                     height: "40px", // Set height
//                     borderRadius: "50%", // Make it circular
//                     border: "2px solid #1890ff", // Add a border with a color
//                     objectFit: "cover", // Ensure the image covers the avatar area
//                   }}
//                   alt="User Avatar"
//                 />
//                 {username || "User"}
//               </span>
//             </Dropdown>

//             {/* <Dropdown overlay={languageMenu}>
//               <ZhihuOutlined
//                 style={{
//                   fontSize: "20px",
//                   marginLeft: "20px",
//                   cursor: "pointer",
//                   borderRadius: "18px",
//                   border: "1px solid black",
//                   padding: "5px",
//                 }}
//               />
//             </Dropdown> */}
//           </div>
//         </Header>

//         <Layout
//           style={{
//             padding: "64px 24px 24px",
//             backgroundColor: "#FFF",
//           }}
//           className={isHomePage ? "home-background" : ""}
//         >
//           <Breadcrumb
//             style={{
//               margin: "6px 0",
//             }}
//           >
//             {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
//             <Breadcrumb.Item>List</Breadcrumb.Item>
//             <Breadcrumb.Item>App</Breadcrumb.Item> */}
//           </Breadcrumb>
//           <Content
//             style={{
//               padding: "0 24",
//               margin: 0,
//               minHeight: 280,
//               // background: "#fff",
//               borderRadius: "8px",
//               // backgroundColor: "#f5f5f5",
//             }}
//           >
//             <Outlet />
//             <Pie {...config} />
//           </Content>
//         </Layout>
//       </Layout>
//       <Modal
//         title="Quy định nhập liệu"
//         visible={isModalVisible}
//         footer={null}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <p></p>
//       </Modal>
//     </Layout>
//   );
// };

// export default Home;
import { useState, useEffect } from "react";
import { Pie, Line } from "@ant-design/charts";
import { Card, Col, Flex, Row, Space, Typography } from "antd";
import * as Icon from "@ant-design/icons";

const data = [
  {
    type: "Quản lý",
    value: 27,
  },
  {
    type: "Nhân viên",
    value: 25,
  },
  {
    type: "Chuyên viên chăm sóc da",
    value: 18,
  },
  {
    type: "Người dùng",
    value: 15,
  },
  {
    type: "Bảo vệ",
    value: 10,
  },
];
const config = {
  forceFit: true,
  title: {
    visible: true,
    text: "Thống kê số lượng",
  },
  description: {
    visible: true,
    text: "Số lượng của từng role",
  },
  radius: 0.8,
  data,
  angleField: "value",
  colorField: "type",
  label: {
    visible: true,
    type: "outer",
    offset: 20,
  },
};

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/antfincdn/YdLK%24VvSkW/fireworks-sales.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config2 = {
    title: {
      visible: true,
      text: "Basic usage of single line chart",
    },
    description: {
      visible: true,
      text: "The most basic and simple way to use a line chart\uFF0C to show the trend of an indicator",
    },
    forceFit: true,
    data,
    padding: "auto",
    xField: "Date",
    yField: "scales",
    xAxis: {
      type: "dateTime",
      tickCount: 5,
    },
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={6} md={12}>
          <Card style={{ height: "100%" }}>
            <Row justify="space-between">
              <Col xs={16}>
                <Typography.Text type="secondary" strong={true}>
                  Today's Sales
                </Typography.Text>
                <Space size="small" align="baseline">
                  <Typography.Title
                    level={3}
                    style={{ margin: 0 }}
                    ellipsis={true}
                  >
                    $53,000
                  </Typography.Title>
                  <Typography.Text type="success" strong={true} ellipsis={true}>
                    +30%
                  </Typography.Text>
                </Space>
              </Col>
              <Col xs={6} style={{ textAlign: "center" }}>
                <Icon.DollarCircleTwoTone
                  style={{ fontSize: "60px", color: "#1890ff" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card style={{ height: "100%" }}>
            <Row>
              <Col xs={16}>
                <Typography.Text type="secondary" strong={true}>
                  Today's Users
                </Typography.Text>
                <Space size="small" align="baseline">
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    $3,200
                  </Typography.Title>
                  <Typography.Text type="success" strong={true}>
                    +20%
                  </Typography.Text>
                </Space>
              </Col>
              <Col xs={6} style={{ textAlign: "center" }}>
                <Icon.RocketTwoTone
                  style={{ fontSize: "60px", color: "#1890ff" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card style={{ height: "100%" }}>
            <Row>
              <Col xs={15}>
                <Typography.Text type="secondary" strong={true}>
                  New Clients
                </Typography.Text>
                <Space size="small" align="baseline">
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    $1,200
                  </Typography.Title>
                  <Typography.Text type="danger" strong={true}>
                    -15%
                  </Typography.Text>
                </Space>
              </Col>
              <Col xs={6} style={{ textAlign: "center" }}>
                <Icon.ContactsTwoTone
                  style={{ fontSize: "60px", color: "#1890ff" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card style={{ height: "100%" }}>
            <Row>
              <Col xs={16}>
                <Typography.Text type="secondary" strong={true}>
                  New Orders
                </Typography.Text>
                <Space size="small" align="baseline">
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    $13,200
                  </Typography.Title>
                  <Typography.Text type="warning" strong={true}>
                    +1%
                  </Typography.Text>
                </Space>
              </Col>
              <Col xs={6} style={{ textAlign: "center" }}>
                <Icon.ShoppingTwoTone
                  style={{ fontSize: "60px", color: "#1890ff" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Flex style={{ marginTop: "20px", gap: "16px" }}>
        <div className="chart">
          <Pie {...config} />
        </div>
        <div className="chart">
          <Line {...config2} />
        </div>
      </Flex>
    </>
  );
};

export default Home;
