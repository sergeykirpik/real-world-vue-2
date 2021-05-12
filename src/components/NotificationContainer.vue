<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NotificationBar from './NotificationBar.vue'
export default {
  components: { NotificationBar },
  computed: mapState('notification', ['notifications']),
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
}
</style>
