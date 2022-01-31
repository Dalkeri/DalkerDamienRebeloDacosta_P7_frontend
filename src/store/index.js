import { createStore } from 'vuex'

export default createStore({
  state: {
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
