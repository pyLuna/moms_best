import { Route, Routes } from "react-router";
import { Url } from "../url/Url";
import Home from "./Home";
import Login from "./Login";
import SignupPage from "./Signup";

const PageRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path={Url.login}
        element={<Login />}
      />
      <Route
        path={Url.signUp}
        element={<SignupPage />}
      />
    </Routes>
  );
};

export default PageRoutes;
