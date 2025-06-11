import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function QuickSearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query.trim())}`);
      setQuery("")
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        placeholder="Rechercher un livre..."
        className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Rechercher
      </button>
    </form>
  );
}
