import { PagePath } from "../enums/page-path.enum";
import useAuthStore from "../features/authentication/hooks/useAuthStore";
// import routeUtil from "@/utils/route.util";
import { createContext, useEffect, type PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { App } from "antd";
import useGetProfile from "../features/authentication/hooks/useGetProfile";
// import useGetFunctionPermissionCodes from "@/features/auth/hooks/useGetFunctionCodes";
import authUtil from "../features/authentication/auth.util";

type AuthGuardContextType = Record<string, unknown>;

type AuthGuardProviderProps = PropsWithChildren;

const AuthGuardContext = createContext<AuthGuardContextType>({});

export function AuthGuardProvider(props: AuthGuardProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { message } = App.useApp();
  const { children } = props;
  const { isAuthenticated, clearSession } = useAuthStore();
  const { mutate: mutateGetProfile } = useGetProfile();
  //   const { mutate: mutateGetFunctionPermissionCodes } =
  //     useGetFunctionPermissionCodes();

  useEffect(() => {
    if (isAuthenticated) {
      //   mutateGetFunctionPermissionCodes();
      mutateGetProfile();
    } else {
      clearSession();

      if (authUtil.getAccessToken() ?? authUtil.getExpiresAt()) {
        message.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
      }

      navigate(PagePath.LOGIN, {
        state: {
          from: location,
        },
        replace: true,
      });
    }
  }, [
    clearSession,
    isAuthenticated,
    location,
    message,
    mutateGetProfile,
    navigate,
  ]);

  return (
    <AuthGuardContext.Provider value={{}}>{children}</AuthGuardContext.Provider>
  );
}

export default AuthGuardContext;
