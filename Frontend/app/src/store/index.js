import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    logging: false,
    loginError: null,
    accessToken: null,
    userId: null
  },
  mutations: {
    loginStart: state => state.logging = true,
    loginStop: (state, errorMessage) => {
      state.logging = false;
      state.loginError = errorMessage;
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken
    },
    updateUserId: (state, userId) => {
      state.userId = userId
    }
  },
  actions: {
    doLogin({commit}, loginData) {
      commit('loginStart');

      axios.post(`${process.env.VUE_APP_API}/auth/login`, {
        ...loginData
      })
      .then(response => {
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        commit('loginStop', null);
        commit('updateAccessToken', response.data.token);
        commit('updateUserId', response.data.userId);
      })
      .catch(error => {
        commit('loginStop', error.response.data.error);
        commit('updateAccessToken', null);
        commit('updateUserId', null);
      })
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
      commit('updateUserId', localStorage.getItem('userId'));
    }
  },
  modules: {
  }
})
