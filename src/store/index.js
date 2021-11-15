import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    token: '',
    navMenu: 'none',
    userConnected: '',
    actualRoute: 'home'
  },
  mutations: {
    increment (state) {
      state.count++;
      console.log(state.count);
    },
    saveToken (state, token){
      state.token = token;
      // console.log("state.token", state.token);
    },
    setStateHeader (state, value){
      if(state.navMenu !== value){
        state.navMenu = value;
      } else {
        state.navMenu = "none";
      }
    },
    setUserInfo(state, value){
      state.userConnected = value;
      //ADD setRequestConfig
      // console.log("state", state);
    },
    setActualRoute(state, value){
      state.actualRoute = value;
      console.log("set actual route", value);
    }
  },
  actions: {
    stateHeader(context, state) {
      context.commit('setStateHeader', state);
    },
    userInfo(context, state){
      context.commit('setUserInfo', state);
      context.commit('setStateHeader', "none");
      // console.log("here");
    },
    actualRoute(context, state){
      console.log("actualroute", state);
      context.commit('setActualRoute', state);
    }
  },
  // created: {
  //   console.log("created vuex");
  // },
  modules: {
  }
})
