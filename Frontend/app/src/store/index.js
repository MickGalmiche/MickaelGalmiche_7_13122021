import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    logging: false,
    loginError: null,
    accessToken: null
  },
  mutations: {
    loginStart: state => state.logging = true,
    loginStop: (state, errorMessage) => {
      state.logging = false;
      state.loginError = errorMessage;
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken
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
        commit('loginStop', null);
        commit('updateAccessToken', response.data.token);
      })
      .catch(error => {
        commit('loginStop', error.response.data.error);
        commit('updateAccessToken', null);
      })
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
    }
  },
  modules: {
  }
})
