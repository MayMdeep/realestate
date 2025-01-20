import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./Layout/Sidebar/Sidebar";
import Header from "./Layout/Header/Header";
import Login from "./Auth/Login";
import User from "./Component/User/User";
import Log from "./Component/Log/Log";
import MetricsChart from "./Component/Metrics/MetricsChart";
import AddUser from "./Component/User/AddUser";
import ProtectedRoute from "../src/Route/ProtectedRoute"; // Import the ProtectedRoute component

function AppContent() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleResize = () => {
        if (window.innerWidth < 968) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {!isLoginPage && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
            <main className="content">
                {!isLoginPage && <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute>
                                <User />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/logs"
                        element={
                            <ProtectedRoute>
                                <Log />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/metrics"
                        element={
                            <ProtectedRoute>
                                <MetricsChart />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/AddUser"
                        element={
                            <ProtectedRoute>
                                <AddUser />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </>
    );
}

export default AppContent;