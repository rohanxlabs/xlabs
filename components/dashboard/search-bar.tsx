"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
  searchQuery: string
}

export function SearchBar({ onSearch, searchQuery }: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(localQuery)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [localQuery, onSearch])

  useEffect(() => {
    if (searchQuery !== localQuery) {
      setLocalQuery(searchQuery)
    }
  }, [searchQuery])

  const handleClear = () => {
    setLocalQuery("")
    onSearch("")
  }

  return (
    <div className={`relative flex items-center transition-all duration-300 ${isFocused ? 'scale-[1.01]' : 'scale-100'}`}>
      <div className={`absolute inset-0 rounded-xl bg-white/[0.04] border transition-all duration-300 ${
        isFocused 
          ? 'border-phthalo-500/50 shadow-lg shadow-phthalo-500/10' 
          : 'border-white/[0.08]'
      }`} />
      
      <Search className="absolute left-4 w-5 h-5 text-content-tertiary" />
      
      <input
        type="text"
        placeholder="Search technologies, projects, or skills..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative w-full bg-transparent text-content-primary placeholder-content-tertiary py-4 pl-12 pr-12 rounded-xl outline-none text-base"
        aria-label="Search dashboard"
      />
      
      {localQuery && (
        <button
          onClick={handleClear}
          className="absolute right-4 p-1 rounded-md hover:bg-white/[0.08] transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4 text-content-tertiary" />
        </button>
      )}
    </div>
  )
}