export default function () {
  return store => {
    let dispatch = store.dispatch
    store.subscribe((mutation) => {
      let payload = mutation.payload
      const meta = payload.meta;
      switch (mutation.type) {
        case 'modal/SET_CREATE_USER':
          if (!payload.data) {
            dispatch('user/setInitialState', {
              meta,
            })
          }
          break
      }
    })
  }
}
