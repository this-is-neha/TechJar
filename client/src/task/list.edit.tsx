import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import HeaderComponent from "../Home/header";
const baseURL = "http://localhost:3001/list";

const ListEdit: React.FC = () => {
  const [list, setList] = useState<any>({
    title: "",
    description: "",
    duedate: "",
    status: "pending",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams<{ id: string }>();
  console.log("Editing todo with ID:", id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(`${baseURL}/${id}`);
        console.log("Fetched todo data:", response.data);
        
        const data = response.data.result;
        setList({
          title: data.title || "",
          description: data.description || "",
          duedate: data.duedate || "",
          status: data.status || "pending",
        });
      } catch (err) {
        console.error("Error fetching todo:", err);
        setError("Failed to load todo data");
      }
    };
    fetchList();
  }, [id]);

  const handleChange = (e: any) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await axios.put(`${baseURL}/${id}`, {
        title: list.title,
        description: list.description,
        status: list.status,
        duedate: list.duedate || "",
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/tasks");
      }, 2000);
    } catch (err) {
      console.error("Error updating todo:", err);
      setError("Failed to update todo. Please try again.");
    }
  };

  return (
    <>
      <HeaderComponent />
      <div className="min-h-screen flex items-center justify-center bg-indigo-100 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Edit Todo
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={list.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter title"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={list.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                placeholder="Enter description"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Due Date</label>
              <input
                type="date"
                name="duedate"
                value={list.duedate ? list.duedate.split("T")[0] : ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Status</label>
              <select
                name="status"
                value={list.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-center font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Update Todo
            </button>
          </form>

          {success && (
            <div className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg text-center font-medium">
              Todo Updated Successfully!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListEdit;