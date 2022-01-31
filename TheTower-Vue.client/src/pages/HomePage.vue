<template>
  <div class="row justify-content-center mt-3">
    <div class="col-12">
      <div class="card banner">
        <p>Tower Home Banner Here</p>
      </div>
    </div>
  </div>
  <div class="row">
    <div>
      <p>Row here for filter event types</p>
    </div>
  </div>
  <div class="row">Event cols will draw here</div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { eventsService } from "../services/EventsService"
import { AppState } from '../AppState'
export default {
  setup() {
    onMounted(async () => {
      try {
        await eventsService.getEvents
      } catch (error) {

      }
    })
    return {
      name: 'Home',
      events: computed(() => AppState.events)
    }
  }

}
</script>

<style scoped lang="scss">
.banner {
  min-height: 30vh;
}
</style>
