import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, userInfo) {
      state.info = userInfo
    },
    clearInfo(state) {
      state.info = { locale: state.info.locale }
    }
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updateData = { ...getters.info, ...toUpdate }
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .update(updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        // const userInfo = (await firebase
        //   .database()
        //   .ref(`/users/${uid}/info`)
        //   .once('value')).val()
        commit('setInfo', 
          (await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once('value')).val()
          )
        console.log((await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once('value')).val())
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: state => state.info
  }
}
