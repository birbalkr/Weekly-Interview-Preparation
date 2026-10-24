import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from '../app/layout/AppLayout'
import DashboardPage from '../features/dashboard/ui/DashboardPage'


function AppRoutes() {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    path: '/',
                    element: <DashboardPage />
                }
            ]
        },
    ])
    return <RouterProvider router={routes} />
}

export default AppRoutes
