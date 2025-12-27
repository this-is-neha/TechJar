import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../Home/header";
const baseURL = "https://techjar-1.onrender.com/list";

const ListList: React.FC = () => {
  const [lists, setLists] = useState<any[]>([]);
  const [filteredLists, setFilteredLists] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all")
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(`${baseURL}/all`);
        setLists(response.data.result || []);
        console.log("Fetched todos:", response.data);
      } catch (exception) {
        console.error("Error fetching todos:", exception);
        setLists([]);
      }
    };
    fetchLists();
  }, []);

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };
  
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(`${baseURL}/${deleteId}`);
      setLists(lists.filter((list) => list._id !== deleteId));
    } catch (exception) {
      console.error("Error deleting todo:", exception);
    }
    setDeleteId(null);
  };
  const applyFilter = (filterType: string, listData = lists) => {
    setFilter(filterType);
    if (filterType === "all") {
      setFilteredLists(listData);
    } else if (filterType === "completed") {
      setFilteredLists(listData.filter(list => list.status === "completed"));
    } else if (filterType === "pending") {
      setFilteredLists(listData.filter(list => list.status === "pending"));
    }
  };
  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";

    try {
      await axios.put(`${baseURL}/${id}`, {
        status: newStatus,
      });

      setLists(lists.map(list =>
        list._id === id ? { ...list, status: newStatus } : list
      ));
    } catch (exception) {
      console.error("Error updating status:", exception);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/tasks/edit/${id}`);
  };

  return (
    <>
      <HeaderComponent />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-3">
              <button
                onClick={() => applyFilter("all")}
                className={`font-semibold px-5 py-2.5 rounded-lg transition ${filter === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                All
              </button>
              <button
                onClick={() => applyFilter("completed")}
                className={`font-semibold px-5 py-2.5 rounded-lg transition ${filter === "completed"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Completed
              </button>
              <button
                onClick={() => applyFilter("pending")}
                className={`font-semibold px-5 py-2.5 rounded-lg transition ${filter === "pending"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Pending
              </button>
            </div>
            <h1 className="text-4xl font-bold text-indigo-700">
              Your Todo Lists
            </h1>
            <button
              onClick={() => navigate("/task/create")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
            >
              Create New
            </button>

          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredLists.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center text-gray-500 px-6 py-8 text-lg"
                    >
                      No Todos available
                    </td>
                  </tr>
                ) : (
                  filteredLists.map((list) => (
                    <tr
                      key={list._id}
                      className="hover:bg-indigo-50 transition"
                    >
                      <td className="px-6 py-4 border-b text-gray-800 font-medium">
                        {list.title}
                      </td>

                      <td className="px-6 py-4 border-b text-gray-600">
                        {list.description || "-"}
                      </td>

                      <td className="px-6 py-4 border-b text-gray-600">
                        {list.duedate || "-"}
                      </td>

                      <td className="px-6 py-4 border-b text-center">
                        <button
                          onClick={() => handleStatusToggle(list._id, list.status)}
                          className={`px-4 py-1.5 rounded-full font-semibold text-sm transition ${list.status === "completed"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            }`}
                        >
                          {list.status === "completed" ? "✓ Completed" : " Pending"}
                        </button>
                      </td>

                      <td className="px-6 py-4 border-b">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleEdit(list._id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(list._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Delete Todo</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this todo?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListList;