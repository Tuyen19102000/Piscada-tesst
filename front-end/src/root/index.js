import { Navigate, Route, Routes } from "react-router-dom";
import DevicePage from "../pages/DevicePage";
import DashboardPage from "../pages/DashboardPage";
import HookMqtt from "../components/Connection/index";
export const Root = () => {
    return (
        <Routes>
            <Route element={<HookMqtt />} path="/" />
            <Route element={<DevicePage />} path="/device" />
            <Route element={<DashboardPage />} path="/dashboard" />
        </Routes>
    );
};
