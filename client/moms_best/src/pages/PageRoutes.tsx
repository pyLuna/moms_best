import { Route, Routes } from "react-router";
import Home from "./Home";
import Login from "./Login";

const PageRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default PageRoutes;