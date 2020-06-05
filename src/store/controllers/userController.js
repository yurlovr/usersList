import Api from '../../api/Api'
import { SMTH_GO_WRONG,
          REFRESH_USER_TIMEOUT,
          LOADING_ACTIONS,
          PROJECT_ID,
          SAVE_PROPS,
          NEW_USER_BALANCE } from '../../const/const'

export default function () {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters
    store.subscribe((mutation) => {
      let message = NEW_USER_BALANCE
      let payload = mutation.payload
      let args = null
      const meta = payload.meta
      const updateUser = (args) => {
        Api.UpdateCurrentUser(args)
        .then(res => {
          if (res.starus === 200) {
            dispatch('app/setIsLoading', {
              meta,
              data: LOADING_ACTIONS.USER
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
      }
      switch (mutation.type) {
        case 'user/SET_EDIT_BALANCE':
          if (!payload.data) {
            dispatch('user/setReasonChangeBalance', {
              meta,
              data: null
            })
            dispatch('user/setChangeUserBalance', {
              meta,
              data: null
            })
          }
        break
      case 'user/SET_NEW_USER_BALANCE':
        Api.NewUserBalance({
          amount: getter['user/getChangeUserBalance'],
          comment: getter['user/getReasonChangeBalance'],
          project_id: PROJECT_ID,
          user_id: getter['app/getCurrentUser'].user_id
        })
        .then(res => {
          if(res.data.message) {
            message = res.data.message
          } else {
            message = message + res.data.amount
          }
          dispatch('user/setBalanceChanged', {
            meta,
            data: message
          })
        })
        .catch(() => {
          dispatch('user/setBalanceChanged', {
            meta,
            data: SMTH_GO_WRONG
          })
        })
        break
      case 'user/SET_BALANCE_CHANGED':
        if (payload.data) {
          Api.GetCurrentUser({
            user_id: getter['app/getCurrentUser'].user_id
          })
          .then(res => {
            dispatch('app/setCurrentUser', {
              meta,
              data: res
            })
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {
            setTimeout(() => {
              dispatch('user/setEditBalance', {
                meta,
                data: false
              })
              dispatch('user/setInitialState', {
                meta,
              })
            }, REFRESH_USER_TIMEOUT)
          })
        }
        break
      case 'user/SET_EDIT_PROPS_USER':
        switch(payload.data) {
          case SAVE_PROPS.SNAME:
            if(getter['app/getCurrentUser'].user_name !== getter['user/getUserName']) {
              args ={
                user_name: getter['user/getUserName'],
                user_id: getter['app/getCurrentUser'].user_id
              }
              updateUser(args)
            }
            break
          case SAVE_PROPS.SCUSTOM:
            if(getter['app/getCurrentUser'].user_custom !== getter['user/getUserCustomName']) {
              args ={
                user_custom: getter['user/getUserCustomName'],
                user_id: getter['app/getCurrentUser'].user_id
              }
              updateUser(args)
            }
            break
          case SAVE_PROPS.SEMAIL:
            if(getter['app/getCurrentUser'].email !== getter['user/getUserEmail']) {
              args = {
                email: getter['user/getUserEmail'],
                user_id: getter['app/getCurrentUser'].user_id
              }
              updateUser(args)
            }
            break
          }
        break
      }
    })
  }
}
