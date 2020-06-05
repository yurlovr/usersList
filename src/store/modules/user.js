import { beginToday, endTommorow } from '../../libs/helperFunction'

function initialState () {
  return {
    userName: '',
    userCustomName: '',
    userEmail: '',
    editBalance: false,
    changeUserBalance: null,
    reasonChangeBalance: null,
    balanceChanged: '',
    editPropsUser: '',
    userTransactions: null,
    datePeriod: [beginToday(), endTommorow()],
  }
}

export default {
  namespaced: true,
  state: {
  ...initialState()
  },
  actions: {
    setPeriod: ({ commit }, payload) => commit('SET_PERIOD', payload),
    setUserTransactions: ({ commit }, payload) => commit('SET_USER_TRANSACTIONS', payload),
    setEditPropsUser: ({ commit }, payload) => commit('SET_EDIT_PROPS_USER', payload),
    setBalanceChanged: ({ commit }, payload) => commit('SET_BALANCE_CHANGED', payload),
    setNewUserBalance: ({ commit }, payload) => commit('SET_NEW_USER_BALANCE', payload),
    setReasonChangeBalance: ({ commit }, payload) => commit('SET_REASON_CHANGE_BALANCE', payload),
    setChangeUserBalance: ({ commit }, payload) => commit('SET_CHANGE_USER_BALANCE', payload),
    setEditBalance: ({ commit }, payload) => commit('SET_EDIT_BALANCE', payload),
    setUserName: ({ commit }, payload) => commit('SET_USER_NAME', payload),
    setUserCustomName: ({ commit }, payload) => commit('SET_USER_CUSTOM_NAME', payload),
    setUserEmail: ({ commit }, payload) => commit('SET_USER_EMAIL', payload),
    setInitialState: ({ commit }, payload) => commit('SET_INITIAL_STATE', payload),
  },
  mutations: {
    SET_INITIAL_STATE: (state) => {
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },
    SET_PERIOD: (state, payload) => { state.datePeriod = payload.data },
    SET_USER_TRANSACTIONS: (state, payload) => { state.userTransactions = payload.data },
    SET_EDIT_PROPS_USER: (state, payload) => { state.editPropsUser = payload.data },
    SET_BALANCE_CHANGED: (state, payload) => { state.balanceChanged = payload.data },
    SET_NEW_USER_BALANCE: () => {},
    SET_REASON_CHANGE_BALANCE: (state, payload) => { state.reasonChangeBalance = payload.data },
    SET_CHANGE_USER_BALANCE: (state, payload) => { state.changeUserBalance = payload.data },
    SET_EDIT_BALANCE: (state, payload) => { state.editBalance = payload.data },
    SET_USER_NAME: (state, payload) => { state.userName = payload.data },
    SET_USER_CUSTOM_NAME: (state, payload) => { state.userCustomName = payload.data },
    SET_USER_EMAIL: (state, payload) => { state.userEmail = payload.data }
  },
  getters: {
    getPeriod: state => state.datePeriod,
    getUserTransactions: state => state.userTransactions,
    getEditPropsUser: state => state.editPropsUser,
    getBalanceChanged: state => state.balanceChanged,
    getReasonChangeBalance: state => state.reasonChangeBalance,
    getChangeUserBalance: state => state.changeUserBalance,
    getEditBalance: state => state.editBalance,
    getUserName: state => state.userName,
    getUserCustomName: state => state.userCustomName,
    getUserEmail: state => state.userEmail
  }
}
