<template>
  <div class="row justify-content-center mt-3">
    <div class="col-12 p-4">
      <div class="card banner"></div>
    </div>
  </div>
  <div class="row">
    <div class="d-flex justify-content-around pt-2 text-light">
      <p class="selectable" @click="filterEvents(filtered.concert)">CONCERTS</p>
      <p class="selectable" @click="filterEvents(filtered.sport)">SPORTS</p>
      <p class="selectable" @click="filterEvents(filtered.convention)">
        CONVENTIONS
      </p>
      <p class="selectable" @click="filterEvents(filtered.digital)">DIGITAL</p>
      <p class="selectable" @click="filterEvents(filtered.expos)">EXPOS</p>
    </div>
  </div>
  <div class="row d-flex p-3">
    <Event v-for="e in events" :key="e.id" :event="e" />
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { eventsService } from "../services/EventsService"
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
export default {
  setup() {
    const filtered = ref({})
    onMounted(async () => {
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.toast(error.message, "error"); logger.error(error)
      }
    })
    return {
      name: 'Home',
      events: computed(() => AppState.events),
      async filterEvents(string) {
        let filtered = AppState.events.filter(e => { e.type.toLowerCase() === string.toLowerCase() })
        console.log(filtered)
        return filtered
      }
    }
  }

}
</script>

<style scoped lang="scss">
.banner {
  min-height: 35vh;
  background-image: url("https://images.unsplash.com/photo-1567942712661-82b9b407abbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80");
  background-position: center;
  background-size: cover;
}
</style>

