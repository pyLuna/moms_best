import { Route, Routes } from "react-router";
import Login from "./Login";
import Home from "./Home";

const PageRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

        </Routes>
    )
}

export default PageRoutes;