export default {
  namespaced: true,
  state: {
    createUser: false
  },
  actions: {
    setCreateUser: ({ commit }, payload) => commit('SET_CREATE_USER', payload),
  },
  mutations: {
    SET_CREATE_USER: (state, payload) => { state.createUser = payload.data },
  },
  getters: {
    getCreateUser: state => state.createUser
  }
}
