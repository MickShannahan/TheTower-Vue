<template>
  <div class="row justify-content-center mt-3">
    <div class="col-12 p-4">
      <div class="card banner">
        <p>Tower Home Banner Here</p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="d-flex justify-content-around pt-2">
      <p>CONCERTS</p>
      <p>SPORTS</p>
      <p>CONVENTIONS</p>
      <p>DIGITAL</p>
      <p>EXPOS</p>
    </div>
  </div>
  <div class="row d-flex">
    <Event v-for="n in 10" :key="n" />
  </div>
</template>

<script>
import { computed, onMounted, popScopeId } from '@vue/runtime-core'
import { eventsService } from "../services/EventsService"
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
export default {
  setup() {
    onMounted(async () => {
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.toast(error.message, "error")
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
  min-height: 35vh;
}
</style>
