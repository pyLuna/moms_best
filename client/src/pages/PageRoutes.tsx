import { Url } from "@/url/Url";
import { Route, Routes } from "react-router";
import CategoryPage from "./Category";
import Home from "./Home";

const PageRoutes = () => {
  return (
    <Routes>
      <Route
        path={Url.home}
        element={<Home />}
      />
      <Route
        path={Url.test}
        element={<div>Test Page</div>}
      />
      <Route
        path={Url.category}
        element={<CategoryPage />}
      />
    </Routes>
  );
};

export default PageRoutes;
