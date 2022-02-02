<template>
  <div class="row">
    <div class="col-12">
      <h2>My Events:</h2>
      <div class="row d-flex p-3">
        <Event v-for="e in events" :key="e.id" :event="e" />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <h2>Attending:</h2>
      <div class="row d-flex p-3">
        <Event v-for="e in attending" :key="e.id" :event="e" />
      </div>
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
        debugger
        await accountService.getMyEvents(eventsCreated.id)
      } catch (error) {
        Pop.toast('Unable to find events')
        console.log(error)
      }
    })
    return {
      account: computed(() => AppState.account),
      attending: computed(() => AppState.attending),
      events: computed(() => AppState.myEvents),
      eventsCreated: computed(() => AppState.events.find(e => e.creatorId == AppState.account.id))


    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
