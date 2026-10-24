import { useState } from 'react'

export const useDashHook = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = () => {
        console.log(searchQuery);

    }

    return {
        searchQuery,
        setSearchQuery,
        handleSearch
    }
}


