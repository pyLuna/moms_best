class Route {
  static auth = {
    login: {
      email: "/email",
    },
    signup: {
      email: "/signup/email",
    },
  };
  static user = {
    get: "/my",
    logout: "/logout",
  };
}

export default Route;
