import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = "https://techjar-1.onrender.com/list";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./header";
import { Target, Zap, CheckSquare } from "lucide-react";
const Home: React.FC = () => {
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [overdue, setOverdue] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/all`);
        const tasks = response.data.result || [];
        const total = tasks.length;
        console.log("Total tasks:", total);
        const completed = tasks.filter((t: any) => t.status === "completed").length;
        const pending = tasks.filter((t: any) => t.status === "pending").length;
        const overdue = tasks.filter((t: any) => {
          if (!t.duedate || t.status === "completed") return false;
          return new Date(t.duedate) < new Date();
        }).length;
        console.log("Completed tasks:", completed);
        console.log("Pending tasks:", pending);
        console.log("Overdue tasks:", overdue);
        setCompleted(completed);
        setPending(pending);
        setOverdue(overdue);

      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <HeaderComponent />
      <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-100 p-6">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Welcome to Task Tracker </h1>
        <p className="text-center text-gray-700 mb-8 max-w-md">
          Task Tracker is a simple and easy to use application to help you organize your tasks,
          create new task lists, and keep track of all your important activities in one place.
        </p>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/task/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Create Task
          </button>

          <button
            onClick={() => navigate("/tasks")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            View All Tasks
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-10 text-xl font-semibold text-center">Completed:<span className=" text-2xl text-blue-900">  {completed}</span></div>
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-10 text-xl font-semibold text-center">Pending:<span className="text-blue-900 text-2xl">  {pending}</span></div>
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-10 text-xl font-semibold text-center">Overdue:<span className="text-blue-900 text-2xl">  {overdue}</span></div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="flex justify-center mb-3">
              <Target className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Stay Focused</h3>
            <p className="text-gray-600 text-sm">
              Organize your tasks and focus on what matters most
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="flex justify-center mb-3">
              <Zap className="w-12 h-12 text-yellow-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
            <p className="text-gray-600 text-sm">
              Create, edit, and manage tasks with ease
            </p>
          </div>


          <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="flex justify-center mb-3">
              <CheckSquare className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Track Progress</h3>
            <p className="text-gray-600 text-sm">
              Monitor your completion rate and stay motivated
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

