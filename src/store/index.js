import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    content: 'A -> B: Hello()'
  },
  getters: {
    content: function (state) {
      return state.content
    }
  },
  mutations: {
    changeContent (state, content) {
      state.content = content
    }
  },
  actions: {
    changeContent (context, content) {
      context.commit('changeContent', content)
    }
  }
})
