import { createBrowserRouter, RouterProvider } from 'react-router'
import { AppLayout } from '../app/layout/AppLayout'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { QuestionTrackerPage } from '../features/questions/QuestionTrackerPage'

function SettingsPage() {
    return <div className="page-content"><section className="welcome-row"><div><p className="eyebrow">WORKSPACE</p><h1>Settings</h1><p className="intro">Your workspace settings are ready to customize.</p></div></section><div className="panel"><h2>Profile settings</h2><p className="intro">Settings will be available here as your preparation workspace grows.</p></div></div>
}

function AppRoutes() {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <AppLayout><DashboardPage /></AppLayout>,
        },
        {
            path: '/questions',
            element: <AppLayout><QuestionTrackerPage /></AppLayout>,
        },
        {
            path: '/settings',
            element: <AppLayout><SettingsPage /></AppLayout>,
        },
    ])
    return <RouterProvider router={routes} />
}

export default AppRoutes
