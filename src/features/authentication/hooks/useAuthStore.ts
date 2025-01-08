import { type RoleCode } from "../../../enums/role.enum";
import { User } from "../../../models/user.model";
import dayjs from "dayjs";
import { create } from "zustand";
import authUtil from "../auth.util";

interface SessionParams {
  accessToken?: string;
  refreshToken?: string;
  // isLoggedInWithAzure?: boolean;
  username?: string | null;
  roles?: RoleCode[];
  exp?: number;
}

interface AuthState {
  isAuthenticated: boolean;
  // isLoggedInWithAzure: boolean;
  isRoot: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  username?: string | null;
  roles: RoleCode[];
  // setLoggedInWithAzure: (isLoggedInWithAzure: boolean) => void;
  setAuthenticated: (isAuthenticated?: boolean) => void;
  setUsername: (username?: string | null) => void;
  setRoot: (isRoot: boolean) => void;
  setRoles: (roles: RoleCode[]) => void;
  setSession: (sessionParams: SessionParams) => void;
  clearSession: () => void;
  user: User | null;
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: authUtil.isAuthenticated(),
  // isLoggedInWithAzure: authUtil.isLoggedInWithAzure(),
  isRoot: authUtil.isRoot(),
  accessToken: authUtil.getAccessToken(),
  refreshToken: authUtil.getRefreshToken(),
  expiresAt: authUtil.getExpiresAt(),
  username: authUtil.getUsername(),
  roles: [],
  setAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },
  setUsername: (username) => {
    set((state) => {
      localStorage.username = username;
      state.username = username;
      return state;
    });
  },
  setRoles: (roles) => {
    set((state) => {
      localStorage.roles = roles;
      state.roles = roles;
      return state;
    });
  },
  setRoot: (isRoot) => {
    set((state) => {
      localStorage._r = isRoot;
      state.isRoot = isRoot;
      return state;
    });
  },
  // setLoggedInWithAzure: (isLoggedInWithAzure) => {
  //   set((state) => {
  //     state.isLoggedInWithAzure = isLoggedInWithAzure;
  //     localStorage.isLoggedInWithAzure = isLoggedInWithAzure;
  //     return state;
  //   });
  // },
  setSession: ({ accessToken, refreshToken, exp, username, roles }) =>
    set((state) => {
      if (accessToken) {
        localStorage.accessToken = accessToken;
        state.accessToken = accessToken;
      }
      if (refreshToken) {
        localStorage.refreshToken = refreshToken;
        state.refreshToken = refreshToken;
      }
      if (exp) {
        const expiresAt = dayjs.unix(exp).valueOf() ?? null;
        localStorage.expiresAt = expiresAt;
        state.expiresAt = expiresAt;
      }
      if (username) {
        localStorage.username = username;
        state.username = username;
      }
      if (roles) {
        localStorage.roles = roles;
        state.roles = roles;
      }
      return state;
    }),
  clearSession: () => {
    const itemsToRemove = [
      "accessToken",
      "refreshToken",
      "username",
      "expiresAt",
      "roles",
    ];

    itemsToRemove.forEach((item) => {
      localStorage.removeItem(item);
    });

    set({
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      isAuthenticated: false,
    });
  },

  user: null,
  setUser: (user) => {
    set({ user });
  },
}));

export default useAuthStore;
// import { type RoleCode } from "../../../enums/role.enum";
// import { User } from "../../../models/user.model";
// import storageUtil from "../../../utils/storage.util";
// import dayjs from "dayjs";
// import { create } from "zustand";
// import authUtil from "../auth.util";

// interface SessionParams {
//   accessToken?: string;
//   refreshToken?: string;
//   // remember?: boolean;
//   isLoggedInWithAzure?: boolean;
//   username?: string | null;
//   //   defaultPageKey?: EPageKey | null;
//   roles?: RoleCode[];
//   exp?: number;
// }

// interface AuthState {
//   isAuthenticated: boolean;
//   isLoggedInWithAzure: boolean;
//   isRoot: boolean;
//   accessToken: string | null;
//   refreshToken: string | null;
//   expiresAt: number | null;
//   // remember: boolean | null;
//   username?: string | null;
//   //   defaultPageKey?: EPageKey | null;
//   roles: RoleCode[];
//   setLoggedInWithAzure: (isLoggedInWithAzure: boolean) => void;
//   setAuthenticated: (isAuthenticated?: boolean) => void;
//   setUsername: (username?: string | null) => void;
//   setRoot: (isRoot: boolean) => void;
//   setRoles: (roles: RoleCode[]) => void;
//   //   setDefaultPageKey: (defaultPageKey: EPageKey) => void;
//   setSession: (sessionParams: SessionParams) => void;
//   clearSession: () => void;
//   user: User | null;
//   setUser: (user: User) => void;
// }

// const useAuthStore = create<AuthState>((set) => ({
//   isAuthenticated: authUtil.isAuthenticated(),
//   isLoggedInWithAzure: authUtil.isLoggedInWithAzure(),
//   isRoot: authUtil.isRoot(),
//   accessToken: authUtil.getAccessToken(),
//   refreshToken: authUtil.getRefreshToken(),
//   expiresAt: authUtil.getExpiresAt(),
//   remember: authUtil.getRemember(),
//   username: authUtil.getUsername(),
//   //   defaultPageKey: authUtil.getDefaultPageKey(),
//   //   functionPermissionCodes: authUtil.getFunctionPermissionCodes(),
//   roles: [],
//   setAuthenticated: (isAuthenticated) => {
//     set({ isAuthenticated });
//   },
//   setUsername: (username) => {
//     set((state) => {
//       state.remember
//         ? (localStorage.username = username)
//         : (sessionStorage.username = username);
//       state.username = username;
//       return state;
//     });
//   },
//   setRoles: (roles) => {
//     set((state) => {
//       state.remember
//         ? (localStorage.roles = roles)
//         : (sessionStorage.roles = roles);
//       state.roles = roles;
//       return state;
//     });
//   },
//   setRoot: (isRoot) => {
//     set((state) => {
//       state.remember
//         ? (localStorage._r = isRoot)
//         : (sessionStorage._r = isRoot);
//       state.isRoot = isRoot;
//       return state;
//     });
//   },
//   setLoggedInWithAzure: (isLoggedInWithAzure) => {
//     set((state) => {
//       state.isLoggedInWithAzure = isLoggedInWithAzure;
//       state.remember
//         ? (localStorage.isLoggedInWithAzure = isLoggedInWithAzure)
//         : (sessionStorage.isLoggedInWithAzure = isLoggedInWithAzure);

//       return state;
//     });
//   },
//   setSession: ({
//     accessToken,
//     refreshToken,
//     exp,
//     username,
//     roles,
//     remember,
//     // defaultPageKey,
//   }) =>
//     set((state) => {
//       if (remember !== undefined) {
//         localStorage.remember = `${remember}`;
//         state.remember = remember;
//       }
//       if (accessToken) {
//         state.remember
//           ? (localStorage.accessToken = accessToken)
//           : (sessionStorage.accessToken = accessToken);
//         state.accessToken = accessToken;
//       }
//       if (refreshToken) {
//         state.remember
//           ? (localStorage.refreshToken = refreshToken)
//           : (sessionStorage.refreshToken = refreshToken);
//         state.refreshToken = refreshToken;
//       }
//       if (exp) {
//         const expiresAt = dayjs.unix(exp).valueOf() ?? null;
//         state.remember
//           ? (localStorage.expiresAt = expiresAt)
//           : (sessionStorage.expiresAt = expiresAt);
//         state.expiresAt = expiresAt;
//       }
//       if (username) {
//         state.remember
//           ? (localStorage.username = username)
//           : (sessionStorage.username = username);
//         state.username = username;
//       }
//       if (roles) {
//         state.remember
//           ? (localStorage.roles = roles)
//           : (sessionStorage.roles = roles);
//         state.roles = roles;
//       }
//       //   if (defaultPageKey) {
//       //     state.remember
//       //       ? (localStorage._defaultPK = defaultPageKey)
//       //       : (sessionStorage._defaultPK = defaultPageKey);
//       //     state.defaultPageKey = defaultPageKey;
//       //   }

//       return state;
//     }),
//   clearSession: () => {
//     storageUtil.storageRemoveItems(
//       "accessToken",
//       "refreshToken",
//       "username",
//       "expiresAt",
//       "roles",
//       "_defaultPK"
//     );

//     set({
//       accessToken: null,
//       refreshToken: null,
//       expiresAt: null,
//       //   defaultPageKey: null,
//       isAuthenticated: false,
//     });
//   },

//   user: null,
//   setUser: (user) => {
//     set({ user });
//   },
// }));

// export default useAuthStore;
