import React from "react";
import HeaderComponent from "../Home/header";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
const baseURL = "https://techjar-1.onrender.com/list";

const searchPage = () => {
    const [params] = useSearchParams();
    const query = params.get("query");
    const [detail, setDetail] = useState<any[]>([]);
    console.log("Search query:", query);
    useEffect(() => {
        const handleSearch = async () => {
            const response = await axios.get(`${baseURL}/title/${query}`, {
                headers: {
                    "Content-Type": "application/json",
                },

            });

            console.log("Search response:", response.data.result);
              const result = response.data.result;
              setDetail(result ? [result] : []);
        }
        handleSearch();
    }, [query]);
    return (<>
        <HeaderComponent />
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 flex items-center justify-center p-6">
            <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-indigo-700">
                        Search Results
                    </h1>
                </div>
               <div>
    {detail.length > 0 ? detail.map((item: any) => (
        <div key={item._id} className="mb-6 p-8 rounded-2xl shadow-lg bg-gradient-to-r from-white to-indigo-50 border-l-4 border-indigo-600">
            <h2 className="text-4xl font-bold text-indigo-800 mb-4">{item.title}</h2>
            <div className="space-y-3">
                <div className="flex items-start gap-2">
                    <span className="text-lg font-semibold text-gray-700">Description:</span>
                    <p className="text-lg text-gray-600">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-gray-700">Due Date:</span>
                    <p className="text-lg text-gray-600">{item.duedate ? new Date(item.duedate).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-gray-700">Status:</span>
                    <span className={`text-lg font-bold px-4 py-1 rounded-full ${item.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                </div>
            </div>
        </div>
    )) : (
        <div className="text-center py-12">
            <p className="text-2xl text-gray-500 font-medium">No results found for "{query}"</p>
        </div>
    )}
</div>
            </div>
        </div>
    </>);
}
export default searchPage;  