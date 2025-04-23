
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex w-full">
      <Input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-12 text-lg pr-12 pl-4 rounded-xl shadow bg-white border-0"
        aria-label="Search for a city"
      />
      <Button
        type="submit"
        className="absolute right-1 top-1 h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow -mr-1 flex items-center justify-center"
        tabIndex={-1}
      >
        <Search size={22} />
      </Button>
    </form>
  );
};

export default SearchBar;
