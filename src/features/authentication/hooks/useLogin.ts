import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { App } from "antd";
import axios, { type AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "./useAuthStore";
import { type RoleCode } from "../../../enums/role.enum";
import { LoginResponseDto } from "../dto/login.dto";

interface DecodedToken {
  username: string;
  roles: RoleCode[];
  exp: number;
}

const login = async (credentials: { username: string; password: string }) => {
  const response = await axios.post<LoginResponseDto>(
    "https://dev.ddc.fis.vn/econstruction_api/auth/login",
    credentials,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

const useLogin = (
  options?: UseMutationOptions<
    LoginResponseDto,
    AxiosError,
    { username: string; password: string }
  >
) => {
  const { message } = App.useApp();
  const { setAuthenticated, setSession } = useAuthStore((state) => state);

  return useMutation({
    mutationFn: login,
    onSuccess: (response, variables, context) => {
      const { accessToken, refreshToken } = response.data;
      const decoded = jwtDecode<DecodedToken>(accessToken);
      const { username, exp } = decoded;

      setAuthenticated(true);
      setSession({
        accessToken,
        refreshToken,
        username,
        exp,
      });

      message.success("Đăng nhập thành công");
      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
    // onError: (error: AxiosError<unknown>) => {
    //   message.error(
    //     (error?.response?.data as { message?: string })?.message ||
    //       error.message ||
    //       "Lỗi máy chủ"
    //   );
    // },
    onError: (error, variables, context) => {
      message.error(
        (error?.response?.data as { message?: string })?.message ||
          error.message ||
          "Lỗi máy chủ"
      );

      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};

export default useLogin;
