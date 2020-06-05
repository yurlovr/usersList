export default {
  namespaced: true,
  state: {
    page: 1,
    offset: 0,
    limit: 9,
    recordsTotal: 0
  },
  actions: {
    setPage: ({ commit }, payload) => commit('SET_PAGE', payload),
    setOffset: ({ commit }, payload) => commit('SET_OFFSET', payload),
    setLimit: ({ commit }, payload) => commit('SET_LIMIT', payload),
    setTotalRecords: ({ commit }, payload) => commit('SET_TOTLA_RECORDS', payload),
  },
  mutations: {
    SET_PAGE: (state, payload) => { state.page = payload.data },
    SET_OFFSET: (state, payload) => { state.offset = payload.data },
    SET_LIMIT: (state, payload) => { state.limit = payload.data },
    SET_TOTLA_RECORDS: (state, payload) => { state.recordsTotal = payload.data },
  },
  getters: {
    getPage: state => state.page,
    getOffset: state => state.offset,
    getLimit: state => state.limit,
    getTotalRecords: state => state.recordsTotal,
  }
}
