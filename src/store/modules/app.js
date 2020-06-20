import { HEADER_BUTTON_STATE } from '../../const/const'

export default {
  namespaced: true,
  state: {
    usersData: null,
    currentUser: null,
    isLoading: null,
    message: null,
    currentUserId: null,
    headerText: '',
    showButtonCreate: HEADER_BUTTON_STATE.SHOW,
  },
  actions: {
    setHeaderText: ({ commit }, payload) => commit('SET_HEADER_TEXT', payload),
    setShowBtnCreateUser: ({ commit }, payload) => commit('SET_SHOW_BUTTON_CREATE_USER', payload),
    setCurrentUserId: ({ commit }, payload) => commit('SET_CURRENT_USER_ID', payload),
    setUserCreatedMessage: ({ commit }, payload) => commit('SET_USER_CREATED_MESSAGE', payload),
    setUsersData: ({ commit }, payload) => commit('USERS_DATA', payload),
    setCurrentUser: ({ commit }, payload) => commit('SET_CURRENT_USER', payload),
    setIsLoading: ({ commit }, payload) => commit('SET_IS_LOADING', payload),
    setCreateNewUser: ({ commit }, payload) => commit('SET_CREATE_NEW_USER', payload),
  },
  mutations: {
    SET_HEADER_TEXT: (state, payload) => { state.headerText = payload.data },
    SET_SHOW_BUTTON_CREATE_USER: (state, payload) => { state.showButtonCreate = payload.data },
    SET_CURRENT_USER_ID: (state, payload) => { state.currentUserId = payload.data },
    USERS_DATA: (state, payload) => { state.usersData = payload.data },
    SET_IS_LOADING: (state, payload) => { state.isLoading = payload.data },
    SET_CURRENT_USER: (state, payload) => { state.currentUser = payload.data },
    SET_USER_CREATED_MESSAGE: (state, payload) => { state.message = payload.data },
    SET_CREATE_NEW_USER: () => {}
  },
  getters: {
    getHeaderText: state => state.headerText,
    getShowBtnCreateUser: state => state.showButtonCreate,
    getCurrentUserId: state => state.currentUserId,
    getUsersData: state => state.usersData,
    getCurrentUser: state => state.currentUser,
    getIsLoading: state => state.isLoading,
    getUserCreated: state => state.message
  }
}
