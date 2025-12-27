import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(search)}`);


  };

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-br from-blue-100 to-indigo-200 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-bold text-indigo-700">
            Task Tracker
          </span>
        </div>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="px-10 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default HeaderComponent
