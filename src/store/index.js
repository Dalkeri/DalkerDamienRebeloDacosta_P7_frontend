import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    token: '',
    navMenu: 'none',
  },
  mutations: {
    increment (state) {
      state.count++;
      console.log(state.count);
    },
    saveToken (state, token){
      state.token = token;
      console.log("state.token", state.token);
    },
    setStateHeader (state, value){
      if(state.navMenu !== value){
        state.navMenu = value;
      } else {
        state.navMenu = "none";
      }
    }
  },
  actions: {
    stateHeader(context, state) {
      context.commit('setStateHeader', state);
    }
  },
  modules: {
  }
})
