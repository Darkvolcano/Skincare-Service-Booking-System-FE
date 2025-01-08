// import { EPagePath } from '@/enums/page-path.enum'
// import useAuthStore from '@/features/auth/hooks/useAuthStore'
// import useCurrentPage from '@/hooks/useCurrentPage'
// import useAppRoutes from '@/hooks/useAppRoutes'
// import routeUtil from '@/utils/route.util'
// import { createContext, type PropsWithChildren } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { App } from 'antd'

// type PermissionGuardContextType = Record<string, any>

// interface PermissionGuardProviderProps extends PropsWithChildren {}

// const PermissionGuardContext = createContext<PermissionGuardContextType>({})

// export function PermissionGuardProvider(props: PermissionGuardProviderProps) {
//   const navigate = useNavigate()
//   const routes = useAppRoutes()
//   const { message } = App.useApp()

//   const { children } = props
//   const { path } = useCurrentPage()
//   const { isAuthenticated, roles, functionPermissionCodes, isRoot } = useAuthStore()

//   if (isAuthenticated && !routeUtil.hasRouteByUserRolesAndRoutePath(roles, routes, path ?? '')) {
//     navigate(EPagePath.FORBIDDEN, { replace: true })
//   } else {
//     if (
//       isAuthenticated &&
//       !isRoot &&
//       !routeUtil.hasAccessibleToPathByFunctionCode(functionPermissionCodes, routes, path ?? '')
//     ) {
//       message.warning('Bạn không có quyền truy cập trang này!')
//       navigate(EPagePath.FORBIDDEN, { replace: true })
//     }
//   }

//   return <PermissionGuardContext.Provider value={{}}>{children}</PermissionGuardContext.Provider>
// }

// export default PermissionGuardContext
