<template>
  <div class="row justify-content-center mt-3">
    <div class="col-12 p-4">
      <div class="card banner"></div>
    </div>
  </div>
  <div class="row">
    <div class="d-flex justify-content-around pt-2">
      <p class="selectable" @click="filterEvents('Concert')">CONCERTS</p>
      <p class="selectable" @click="filterEvents('Sport')">SPORTS</p>
      <p class="selectable" @click="filterEvents('Convention')">CONVENTIONS</p>
      <p class="selectable" @click="filterEvents('Digital')">DIGITAL</p>
      <p class="selectable" @click="filterEvents('Expos')">EXPOS</p>
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
  background-image: url("https://i.pinimg.com/originals/69/d0/7f/69d07f5b4e21ac19a3bdebbbdd6d2cc1.jpg");
  background-position: center;
  background-size: cover;
}
</style>

