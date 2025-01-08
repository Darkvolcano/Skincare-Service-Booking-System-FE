import { Content } from "antd/es/layout/layout";
import CustomNavbarMenu from "../components/CustomNavBarMenu";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <CustomNavbarMenu />
      <Content style={{ padding: "31px 48px" }}>
        <Outlet />
      </Content>
    </>
  );
};

export default HomePage;
