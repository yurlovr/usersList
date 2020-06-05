import Api  from '../../api/Api'
import { CREATED_TIMEOUT, REFRESH_USER_TIMEOUT, SMTH_GO_WRONG } from '../../const/const'
import uuid from 'uuid'
import { getPeriodForRequest } from '../../libs/helperFunction'
import { LOADING_ACTIONS, HEADER_BUTTON_STATE } from '../../const/const'


export default function () {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters
    store.subscribe((mutation) => {
      let payload = mutation.payload
      const meta = payload.meta;
      let message = 'User was created'
      const userInitialState = () => {
        dispatch('user/setInitialState',{
          meta,
        })
        if (getter['app/getCurrentUser']) {
          dispatch('app/setCurrentUser', {
            meta,
            data: null
          })
        }
      }
      switch (mutation.type) {
        case 'app/SET_IS_LOADING':
          if(!payload.data) return
          switch(payload.data) {
            case LOADING_ACTIONS.USERS:
              userInitialState()
              Api.Users({offset: getter['page/getOffset'],  limit: getter['page/getLimit']})
              .then(res => {
                const { recordsTotal, data} = res
                dispatch('app/setUsersData', {
                  meta,
                  data
                })
                dispatch('page/setTotalRecords', {
                  meta,
                  data: recordsTotal
                })
                dispatch('app/setIsLoading', {
                  meta,
                  data: null
                })
              })
              .catch(error => console.log(error))
              break
            case LOADING_ACTIONS.USER:
              Api.GetCurrentUser({
                user_id: getter['app/getCurrentUserId']
              })
              .then(res => {
                setTimeout(() => {
                  dispatch('app/setCurrentUser', {
                    meta,
                    data: res
                  })
                  dispatch('app/setIsLoading', {
                    meta,
                    data: null
                  })
                }, REFRESH_USER_TIMEOUT)
              })
              .catch((error) => {
                console.log(error)
              })
              break
              case LOADING_ACTIONS.REPORT:
                Api.GetReport({ user_id: getter['app/getCurrentUserId'],
                                  report: true,
                                ...getPeriodForRequest(getter['user/getPeriod'])})
                .then(res => {
                  dispatch('user/setUserTransactions', {
                    meta,
                    data: res
                  })
                  dispatch('app/setIsLoading', {
                    meta,
                    data: null
                  })
                })
                .catch(error => console.log(error))
                break
            }
          break
        case 'app/SET_CREATE_NEW_USER':
          Api.CreateUser({
            user_id: uuid(),
            user_name: getter['user/getUserName'].trim(),
            user_custom: getter['user/getUserCustomName'].trim(),
            email: getter['user/getUserEmail'].trim()
          }).then(res => {
            if (res.data.message) {
              message = res.data.message
            }
            dispatch('app/setUserCreatedMessage', {
              meta,
              data: message
            })
          })
          .catch(() => {
            dispatch('app/setUserCreatedMessage', {
              meta,
              data: SMTH_GO_WRONG
            })
          })
          break
        case 'app/SET_USER_CREATED_MESSAGE':
          if (payload.data) {
            setTimeout(() => {
              dispatch('app/setUserCreatedMessage', {
                meta,
                data: null
              })
              dispatch('user/setInitialState', {
                meta
              })
              dispatch('modal/setCreateUser', {
                meta,
                data: false
              })
              dispatch('app/setIsLoading', {
                meta,
                data: LOADING_ACTIONS.USERS
              })
            }, CREATED_TIMEOUT)
          }
          break
        case 'app/SET_CURRENT_USER_ID':
          if (!payload.data) {
            dispatch('app/setShowBtnCreateUser', {
              meta,
              data: HEADER_BUTTON_STATE.SHOW
            })
            dispatch('app/setCurrentUser', {
              meta,
              data: null
            })
          } else {
            dispatch('app/setShowBtnCreateUser', {
              meta,
              data: HEADER_BUTTON_STATE.HIDE
            })
            dispatch('app/setIsLoading', {
              meta,
              data: LOADING_ACTIONS.USER
            })
          }
          break
      }
    })
  }
}