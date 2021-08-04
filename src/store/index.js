import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    token: ''
  },
  mutations: {
    increment (state) {
      state.count++;
      console.log(state.count);
    },
    saveToken (state, token){
      state.token = token;
      console.log("state.token", state.token);
    }
  },
  actions: {
  },
  modules: {
  }
})
