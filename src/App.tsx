import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./features/authentication/components/Login";
import Register from "./features/authentication/components/Register";
import Home from "./Home";
import WorkVolume from "./features/work_volume/WorkVolume";
import ApprovalVolume from "./features/approval_volume/ApprovalVolume";
import UserListPage from "./features/user/pages/UserListPage";
import HomePage from "./pages/HomePage";
import ProductList from "./pages/ShoppingPage";
import CourtList from "./pages/CourtPage";
import CourtDetail from "./pages/CourtDetail";
import UserDetail from "./features/user/components/UserListDetail";
import { PagePath } from "./enums/page-path.enum";
import Profile from "./features/authentication/components/Profile";
import CustomSidebarMenu from "./components/CustomSidebarMenu";
import VerifyEmail from "./features/authentication/components/VerifyEmail";
import VerifyOTP from "./features/authentication/components/VerifyOTP";
// import { AuthGuardProvider } from "./contexts/AuthGuardContext";

const App = () => {
  return (
    <Router>
      {/* <AuthGuardProvider> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={PagePath.REGISTER} element={<Register />} />
        <Route path={PagePath.VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route path={PagePath.VERIFY_OTP} element={<VerifyOTP />} />
        <Route path={PagePath.ANY} element={<div>404 - Page Not Found</div>} />
        <Route element={<CustomSidebarMenu />}>
          <Route path={PagePath.HOME} element={<Home />}></Route>
          <Route path={PagePath.WORK_VOLUME} element={<WorkVolume />} />
          <Route path={PagePath.APPROVAL_VOLUME} element={<ApprovalVolume />} />
          <Route path={PagePath.USER} element={<UserListPage />} />
          <Route path={PagePath.USER_DETAIL} element={<UserDetail />} />
          <Route path={PagePath.PROFILE} element={<Profile />} />
        </Route>
        <Route path={PagePath.HOME_PAGE} element={<HomePage />}>
          <Route path={PagePath.SHOPPING_PAGE} element={<ProductList />} />
          <Route path="Court" element={<CourtList />} />
          <Route path="Court/:id" element={<CourtDetail />} />
        </Route>
      </Routes>
      {/* </AuthGuardProvider> */}
    </Router>
  );
};

export default App;
