import { Route, Routes } from "react-router";
import Home from "./Home";

const PageRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
    </Routes>
  );
};

export default PageRoutes;
