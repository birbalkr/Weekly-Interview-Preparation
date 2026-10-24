import { Search } from 'lucide-react'
import { useDashHook } from '../features/dashboard/hook/DashHook'

function DashNavbar() {
    const { handleSearch, setSearchQuery } = useDashHook()
    return (
        <nav className="flex items-center justify-between bg-gray-800 text-white border-b border-gray-700">
            <div>
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <p className="text-lg text-gray-400">Welcome to the Dashboard Page!</p>

            </div>
            <div className="p-4">
                <label htmlFor="Search">Search:</label>
                <input name="Search" id="Search" onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search..." className="px-2 py-1 rounded" />
                <Search className="inline-block ml-2" onClick={() => { handleSearch() }} />
            </div>
        </nav>
    )
}

export default DashNavbar
