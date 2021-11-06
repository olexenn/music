import { createStore } from "vuex";

export default createStore({
  state: () => ({
    isAuth: false,
  }),
  mutations: {
    setAuth(state) {
      state.isAuth = !state.isAuth;
    },
  },
});
