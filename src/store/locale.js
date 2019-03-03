import Vue from 'vue'

export default {
  state: {
    locale: window.localStorage.getItem('locale') || 'enUS',
    localeList: []
  },

  mutations: {
    setLocale (state, locale) {
      state.locale = locale
      window.localStorage.setItem('locale', locale)
    },
    setLocaleList (state, localeList) {
      state.localeList = localeList
    }
  },

  actions: {
    async getLocales ({ rootState, dispatch, commit }) {
      await dispatch('verifySession')

      Vue.api.get('list_locales', {
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setLocaleList', data)
        })
        .catch(({ code }) => {
          if (code === 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getLocales'))
          }
        })
    }
  }
}
