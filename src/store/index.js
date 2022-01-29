import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    navMenu: 'none',
    userConnected: '',
  },
  getters:{
    getUserBio: state => {
      return state.userConnected.bio;
    },
    getUserId: state => {
      return state.userConnected.id;
    }
  },
  mutations: {
    saveToken (state, token){
      state.token = token;
    },
    setUserInfo(state, value){
      state.userConnected = value;
    }
  },
  actions: {
    userInfo(context, state){
      context.commit('setUserInfo', state);
    }
  }
})
