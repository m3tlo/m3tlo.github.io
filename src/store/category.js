import firebase from 'firebase/app';
/* eslint-disable no-unused-vars */

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        // const uid = await dispatch('getUid');
        // const category = await firebase
        //   .database()
        //   .ref(`/users/${uid}/categories`)
        //   .push({ title, limit });
        // const category = this.getters.info.categories.push({ title, limit })
        return { title, limit, id: this.getters.info.categories.length + 1 };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        // const uid = await dispatch('getUid');
        // await firebase
        //   .database()
        //   .ref(`/users/${uid}/categories`)
        //   .child(id)
        //   .update({ title, limit });
        const categories = this.getters.info.categories;
        if (categories.find((c) => c.id === id)) {
          categories.title = title;
          categories.limit = limit;
        }
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once('value')
          ).val() || {};
        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        // const uid = await dispatch('getUid');
        // const category =
        //   (
        //     await firebase
        //       .database()
        //       .ref(`/users/${uid}/categories`)
        //       .child(id)
        //       .once('value')
        //   ).val() || {};
        const categories = this.getters.info.categories;
        const category = categories.find((c) => c.id === id)
        
        return {category, id}
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
/* eslint-disable no-unused-vars */
