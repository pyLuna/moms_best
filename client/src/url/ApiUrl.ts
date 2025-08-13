export const ApiUrl = {
  email: "/auth/email",
  signup: {
    email: "/auth/signup/email",
    guest: "/auth/signup/guest",
  },
  user: {
    my: "/user/my",
    logout: "/auth/logout",
    remember: "/user/remember",
  },
  metadata: {
    get: "/metadata",
  },
  category: {
    get: {
      all: "/category/all",
      byId: (id: string) => `/category/${id}`,
      from: (from: string) => `/category/from/${from}`,
    },
    create: "/category/create",
    update: (id: string) => `/category/update/${id}`,
    delete: (id: string) => `/category/delete/${id}`,
    restore: (id: string) => `/category/restore/${id}`,
  },
};
