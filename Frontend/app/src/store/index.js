import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    logging: false,
    loginError: null,
    accessToken: null,
    userId: null,
    userRole: null
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
    },
    updateUserRole: (state, userRole) => {
      state.userRole = userRole
    }
  },
  actions: {
    doLogin({commit}, loginData) {
      commit('loginStart');

      axios.post(`${process.env.VUE_APP_API}/api/auth/login`, {
        ...loginData
      })
      .then(response => {
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userRole', response.data.userRole);
        commit('loginStop', null);
        commit('updateAccessToken', response.data.token);
        commit('updateUserId', response.data.userId);
        commit('updateUserRole', response.data.userRole);
      })
      .catch(error => {
        commit('loginStop', error.response.data.error);
        commit('updateAccessToken', null);
        commit('updateUserId', null);
        commit('updateUserRole', null);
      })
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
      commit('updateUserId', localStorage.getItem('userId'));
      commit('updateUserRole', localStorage.getItem('userRole'));
    },
    doLogout({ commit }) {
      commit('loginStop', null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      commit('updateAccessToken', null);
      commit('updateUserId', null);
      commit('updateUserRole', null);
    }
  },
  modules: {
  }
})
