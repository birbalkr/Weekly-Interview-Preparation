import { BadgeQuestionMark, LayoutDashboard } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router'

function Navbar() {
    return (
        <nav className="bg-gray-800 text-white w-full rounded-l-2xl">
            <div className="font-bold p-4">Interview Practice Tracker</div>
            <hr className="border-gray-600 w-full" />

            <div className="flex flex-col gap-2 p-4">
                <NavLink to="/" className="block px-4 hover:bg-gray-700">
                    <LayoutDashboard className="inline-block mr-2" />
                    Dashboard
                </NavLink>
                <NavLink to="/questions" className="block px-4 hover:bg-gray-700">
                    <BadgeQuestionMark className="inline-block mr-2" />
                    Question
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar
