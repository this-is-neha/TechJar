import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Home/home.tsx";
import Create from "../../src/task/list.create.tsx";
import ViewTasks from "../../src/task/list.all.tsx";
import EditTask from "../../src/task/list.edit.tsx";
import SearchPage from "../../src/Search/page.tsx";

const RoutingConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/task/create" element={<Create />} />
      <Route path="/tasks" element={<ViewTasks />} />
      <Route path ="/tasks/edit/:id" element={<EditTask/>} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default RoutingConfig;
