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
  };
}

export default Route;
