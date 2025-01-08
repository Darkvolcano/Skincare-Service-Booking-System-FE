import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
}

interface LoginValues {
  authen: string;
  username: string;
  password: string;
}

interface AuthStoreState {
  user: User | null;
  accessToken: string | null;
  error: string | null;
  login: (
    values: LoginValues
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  accessToken: null,
  error: null,

  // login: async (values: LoginValues) => {
  //   try {
  //     const response = await fetch(
  //       "https://dev.ddc.fis.vn/econstruction_api/auth/login",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(values),
  //       }
  //     );

  //     const data = await response.json();

  //     console.log("API Response:", data);

  //     if (data.statusCode === 1 && data.data.access_token) {
  //       set({
  //         user: data.data.user,
  //         accessToken: data.data.access_token,
  //         error: null,
  //       });
  //       return { success: true, message: data.message };
  //     } else {
  //       set({ error: data.message || "Login failed" });
  //       return { success: false, message: data.message || "Login failed" };
  //     }
  //   } catch (error) {
  //     const errorMessage = (error as Error).message;
  //     set({ error: errorMessage });
  //     return { success: false, message: errorMessage };
  //   }
  // },
  login: async (values: LoginValues) => {
    try {
      const response = await axios.post(
        "https://dev.ddc.fis.vn/econstruction_api/auth/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      console.log("API Response:", data);

      if (data.statusCode === 1 && data.data.access_token) {
        set({
          user: data.data.user,
          accessToken: data.data.access_token,
          error: null,
        });
        return { success: true, message: data.message };
      } else {
        set({ error: data.message || "Login failed" });
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : (error as Error).message;
      set({ error: errorMessage });
      return { success: false, message: errorMessage };
    }
  },

  logout: () => set({ user: null, accessToken: null, error: null }),
}));

export default useAuthStore;
