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
  static category = {
    get: {
      all: "/all",
      byId: "/:id",
      from: "/from/:from",
    },
    restore: "/restore/:id",
    create: "/create",
    update: "/update/:id",
    delete: "/delete/:id",
  };
}

export default Route;
