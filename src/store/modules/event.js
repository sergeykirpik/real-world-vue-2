import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  eventsTotalCount: 0,
  event: {},
}

export const getters = {
  categoriesLength: (state) => {
    return state.categories.length
  },
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === parseInt(id))
  },
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL_COUNT(state, count) {
    state.eventsTotalCount = count
  },
  SET_CURRENT_EVENT(state, event) {
    state.event = event
  },
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then((response) => {
        commit('ADD_EVENT', response.data)
        const notification = {
          type: 'success',
          message: 'Your event has been created!',
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    return EventService.getEvents(perPage, page)
      .then((response) => {
        commit('SET_EVENTS', response.data)
        commit(
          'SET_EVENTS_TOTAL_COUNT',
          parseInt(response.headers['x-total-count'])
        )
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, dispatch, getters }, id) {
    const event = getters.getEventById(id)

    if (event) {
      commit('SET_CURRENT_EVENT', event)
      return
    }

    EventService.getEvent(id)
      .then((response) => {
        commit('SET_CURRENT_EVENT', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching an event: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
}
