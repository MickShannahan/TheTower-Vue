<template>
  <div class="row">
    <h2>My Events:</h2>
    <div class="row d-flex p-3">
      <Event v-for="e in events" :key="e.id" :event="e" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      try {
        await accountService.getAccountEvents()
      } catch (error) {
        Pop.toast('Unable to find events')
      }
    })
    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.myEvents)

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
