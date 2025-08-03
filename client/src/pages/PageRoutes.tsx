import { Url } from "@/url/Url";
import { Route, Routes } from "react-router";
import CategoryPage from "./Category";
import CreateForumPage from "./forum/Create";
import ForumPage from "./forum/Forum";
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
      <Route
        path={Url.forum.go}
        element={<ForumPage />}
      />
      <Route
        path={Url.forum.go}
        element={<ForumPage />}
      />
      <Route
        path={Url.forum.create}
        element={<CreateForumPage />}
      />
    </Routes>
  );
};

export default PageRoutes;
