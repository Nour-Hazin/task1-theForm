import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../pages/layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

// يفضل دائماً جعل الـ Route الأب هو الأساس
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Route>
    )
);

export default router;