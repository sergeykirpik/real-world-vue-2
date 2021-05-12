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
  createEvent(context, event) {
    console.log('User creating Event is ' + context.rootState.user.user.name)

    context.dispatch('actionToCall')

    return EventService.postEvent(event).then((response) => {
      context.commit('ADD_EVENT', response.data)
    })
  },
  fetchEvents(context, { perPage, page }) {
    return EventService.getEvents(perPage, page)
      .then((response) => {
        context.commit('SET_EVENTS', response.data)
        context.commit(
          'SET_EVENTS_TOTAL_COUNT',
          parseInt(response.headers['x-total-count'])
        )
      })
      .catch((error) => {
        console.log(error)
      })
  },
  fetchEvent(context, id) {
    const event = context.getters.getEventById(id)

    if (event) {
      context.commit('SET_CURRENT_EVENT', event)
      return
    }

    EventService.getEvent(id).then((response) => {
      context.commit('SET_CURRENT_EVENT', response.data)
    })
  },
}
