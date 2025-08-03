import { Route, Routes } from "react-router";
import Home from "./Home";

const PageRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/test"
        element={<div>Test Page</div>}
      />
    </Routes>
  );
};

export default PageRoutes;
