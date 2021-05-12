<template>
  <div>
    <h1>Events for {{ user.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="hasPrev">
      <router-link :to="{ name: 'EventList', query: { page: page - 1 } }"
        >Prev</router-link
      >
    </template>
    |
    <template v-if="hasNext">
      <router-link :to="{ name: 'EventList', query: { page: page + 1 } }"
        >Next</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard,
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNext() {
      return this.page * 3 < this.eventsTotalCount
    },
    hasPrev() {
      return this.page > 1
    },
    ...mapState('event', ['events', 'eventsTotalCount']),

    // mapState('user', ['user'])
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page,
    })
  },
}
</script>
