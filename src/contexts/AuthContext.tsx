/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createContext, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
// import { type LoginWithAzureDto } from '../features/auth/dto/login-with-azure.dto'
import { type LoginDto } from "../features/authentication/dto/login.dto";
import useAuthStore from "../features/authentication/hooks/useAuthStore";
// import useGetFunctionPermissionCodes from '../features/auth/hooks/useGetFunctionCodes'
import useGetProfile from "../features/authentication/hooks/useGetProfile";
import useLogin from "../features/authentication/hooks/useLogin";
import { PagePath } from "../enums/page-path.enum";
// import useLoginWithAzure from '../features/auth/hooks/useLoginWithAzure'

interface AuthContextType {
  handleLogin?: (value: LoginDto) => void;
  // handleLoginWithAzure?: (value: LoginWithAzureDto) => void
  handleLogout?: () => void;
  // handleLogoutWithAzure?: () => void
  // handleRelog?: (password: string) => void
}

interface AuthProviderProps extends PropsWithChildren {}

const AuthContext = createContext<AuthContextType>({});

export function AuthProvider(props: AuthProviderProps) {
  const navigate = useNavigate();
  const { children } = props;
  const { setSession, clearSession } = useAuthStore();
  const { mutate: mutateGetProfile } = useGetProfile();
  // const { mutate: mutateGetFunctionPermissionCodes } =
  //   useGetFunctionPermissionCodes();
  const { mutate: mutateLogin } = useLogin({
    onSuccess: () => {
      mutateGetProfile();
    },
  });
  // const { mutate: mutateRelog } = useLogin();
  // const { mutate: mutateLoginWithAzure } = useLoginWithAzure({
  //   onSuccess: () => {
  //     mutateGetProfile();
  //     mutateGetFunctionPermissionCodes();
  //   },
  //   onError: () => {
  //     navigate(EPagePath.ROOT, { replace: true });
  //   },
  // });

  const handleLogin = (loginDto: LoginDto) => {
    setSession({});
    mutateLogin(loginDto);
  };
  const handleLogout = () => {
    clearSession();
    navigate(PagePath.LOGIN, { replace: true });
  };

  // const handleRelog = (password: string) => {

  //   if (username) {
  //     mutateRelog({ username, password, remember: remember ?? true });
  //   }
  // };

  const value = {
    handleLogin,
    handleLogout,
    // handleRelog,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
