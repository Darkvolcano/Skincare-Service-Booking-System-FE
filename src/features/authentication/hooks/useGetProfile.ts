import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import authUtil from "../auth.util";
import useAuthStore from "./useAuthStore";

const fetchProfile = async () => {
  const accessToken = authUtil.getAccessToken();

  if (!accessToken) {
    throw new Error("No access token found");
  }

  const response = await axios.get(
    "https://dev.ddc.fis.vn/urc-test-api/personal",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

const useGetProfile = () => {
  const { setUsername, setUser, setRoot } = useAuthStore();

  return useMutation({
    mutationFn: fetchProfile,
    onSuccess: (response) => {
      const profile = response?.data?.data || {};
      const { account, isRoot } = profile || {};
      const { username } = account || {};

      setUser(profile);
      setUsername(username);
      setRoot(isRoot ?? false);
      // setDefaultPageKey(routeUtil.getDefaultPageKeyByUser Roles(roles))
    },
    onSettled: () => {
      const accessToken = authUtil.getAccessToken();

      if (accessToken) {
        const decoded = jwtDecode<{
          accountId: string;
          exp: number;
          fullName: string;
          iat: number;
          userCode: string;
        }>(accessToken);
        const { fullName } = decoded;

        setUsername(fullName);
        // setDefaultPageKey(routeUtil.getDefaultPageKeyByUser Roles(roles))
      }
    },
  });
};

export default useGetProfile;
