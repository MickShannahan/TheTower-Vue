<template>
  <div class="row justify-content-center mt-3">
    <div class="col-12 p-4">
      <div class="card banner">
        <div class="col-4 ms-3">
          <img
            class="img-fluid rounded"
            :src="event.coverImg"
            :alt="event.name + ' ' + 'image'"
          />
        </div>
        <div class="col-8">
          <div class="dropdown">
            <div
              class="dropdown-toggle selectable"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="eventDropdown"
            >
              <span class="mx-3 text-white display-3">...</span>
            </div>
            <div class="dropdown-menu p-0" aria-labelledby="eventDropdown">
              <div class="hoverable selectable">Edit Event</div>

              <div
                class="hoverable selectable text-danger"
                @click="cancelEvent()"
              >
                Cancel Event
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row my-4">
    <div class="col-12 px-4">
      <div class="card bg-dark">
        <p>attendees here</p>
      </div>
    </div>
  </div>
  <div class="row mt-5 pt-4 justify-content-center">
    <div class="col-md-10">
      <div class="card">
        <p>comment section here</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import { onMounted } from '@vue/runtime-core';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await eventsService.getEventById(route.params.id)
        await eventsService.getEventComments(route.params.id)
        await eventsService.getEventAttendees(route.params.id)
      } catch (error) {
        Pop.toast(error.message, "error")
      }
    })
    return {
      route,
      event: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      attendees: computed(() => AppState.attendees),
      comments: computed(() => AppState.comments),

      async cancelEvent() {
        if (Pop.confirm('Are you sure you would like to cancel this event?')) {
          try {
            await eventsService.cancelEvent(route.params.id)
          } catch (error) {
            Pop.toast(error.message, "error")
          }
        }
      }

    };
  }
}
</script>

<style>
.banner {
  min-height: 60vh;
  background-image: url("https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
  background-position: center;
  background-size: cover;
}
</style>