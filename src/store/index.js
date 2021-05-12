import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user.js'
import * as event from './modules/event.js'
import * as notification from './modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { user, event, notification },
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
