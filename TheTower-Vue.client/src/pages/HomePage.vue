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
      <p class="selectable" @click="filterEvents('concert')">CONCERTS</p>
      <p class="selectable" @click="filterEvents('sport')">SPORTS</p>
      <p class="selectable" @click="filterEvents('convention')">CONVENTIONS</p>
      <p class="selectable" @click="filterEvents('digital')">DIGITAL</p>
      <p class="selectable" @click="filterEvents('expos')">EXPOS</p>
    </div>
  </div>
  <div class="row d-flex">
    <Event v-for="n in 10" :key="n" />
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
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
      events: computed(() => AppState.events),
      async filterEvents(string) {
        debugger
        let filtered = AppState.events.filter(e => e.type === string)
        console.log(filtered)

      }
    }
  }

}
</script>

<style scoped lang="scss">
.banner {
  min-height: 35vh;
}
</style>



//  editable = ref({ type: '' }),
//       onMounted(async () => {
//         try {
//           await eventsService.getEvents()
//         } catch (error) {
//           Pop.toast(error.message, "error")
//         }
//       })
//     return {
//       name: 'Home',
//       events: computed(() => AppState.events.filter(e => e.type == editable.type)),
//       async filterEvents(string) {
//         debugger
//         let filtered = AppState.events.filter(e => e.type === string)
//         console.log(filtered)
