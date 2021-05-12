import Vue from 'vue'
import Vuex from 'vuex'

import user from './user.js'
import * as event from './event.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { user, event },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
})
