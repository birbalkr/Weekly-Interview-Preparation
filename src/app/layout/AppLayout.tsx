import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router'

function AppLayout() {
  return (
    <div className='flex bg-gray-800 text-white min-h-screen'>
      <div className="w-[15%]"><Navbar /></div>
      <div className='w-[85%]'><Outlet /></div>
    </div>
  )
}

export default AppLayout
