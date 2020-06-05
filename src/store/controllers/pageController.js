import { LOADING_ACTIONS } from '../../const/const'

export default function () {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters
    store.subscribe((mutation) => {
      let payload = mutation.payload
      const meta = payload.meta;
      switch (mutation.type) {
        case 'page/SET_PAGE':
          dispatch('page/setOffset', {
            meta,
            data: getter['page/getLimit'] * (payload.data - 1)
          })
        break
        case 'page/SET_LIMIT':
          dispatch('page/setPage', {
            meta,
            data: 1
          })
          break
        case 'page/SET_OFFSET':
          dispatch('app/setIsLoading', {
            meta,
            data: LOADING_ACTIONS.USERS
          })
          break
      }
    })
  }
}