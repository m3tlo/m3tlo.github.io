import firebase from 'firebase/app';
/* eslint-disable no-unused-vars */

export default {
  state: {
    info: {
      name: 'Даниил',
      bill: 65000,
      records: [
        {id:1, categoryId:1, description:'1jajaj', type: 'outcome', amount:1540, date: new Date().toJSON()},
        {id:2, categoryId:2, description:'2jajaj', type: 'outcome', amount:1510, date: new Date().toJSON()},
        {id:3, categoryId:3, description:'3jajaj', type: 'outcome', amount:120, date: new Date().toJSON()},
        {id:4, categoryId:4, description:'4jajaj', type: 'outcome', amount:1000, date: new Date().toJSON()},
        {id:5, categoryId:1, description:'5jajaj', type: 'income', amount:1540, date: new Date().toJSON()},
        {id:6, categoryId:2, description:'6jajaj', type: 'income', amount:1510, date: new Date().toJSON()},
        {id:7, categoryId:3, description:'7jajaj', type: 'income', amount:120, date: new Date().toJSON()},
        {id:8, categoryId:4, description:'8jajaj', type: 'income', amount:1000, date: new Date().toJSON()},
      ],
      categories: [
        {id:1,title:'Машина', limit: 10000},
        {id:2,title:'Дом', limit: 10000},
        {id:3,title:'Дети', limit: 10000},
        {id:4,title:'Жена', limit: 10000},

      ],
    },
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid');
        const updateData = { ...getters.info, ...toUpdate };
        // await firebase.
        // database().
        // ref(`/users/${uid}/info`).
        // update(toUpdate);
        this.getters.info.bill = toUpdate
        commit('setInfo', updateData);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const info = (
          await firebase.database().ref(`/users/${uid}/info`).once('value')
        ).val();
        commit('setInfo', info);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
  getters: {
    info: (state) => state.info,
  },
};