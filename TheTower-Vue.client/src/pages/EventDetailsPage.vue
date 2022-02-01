<template>
  <div class="row justify-content-center mt-3">
    <div class="col-12 p-4">
      <div class="card banner mb-3">
        <div class="row g-0">
          <div class="col-md-4 my-4 p-3 pt-4">
            <img
              :src="event.coverImg"
              class="img-fluid rounded elevation-4"
              :alt="event.name + ' ' + 'image'"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div class="dropdown">
                <div
                  class="dropdown-toggle selectable text-end"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="eventDropdown"
                >
                  <span class="mx-3 text-white display-3">...</span>
                </div>
                <div class="dropdown-menu p-0" aria-labelledby="eventDropdown">
                  <div class="hoverable selectable" @click="editEvent()">
                    Edit Event
                  </div>

                  <div
                    class="hoverable selectable text-danger"
                    @click="cancelEvent()"
                  >
                    Cancel Event
                  </div>
                </div>
              </div>
              <h2 class="card-title text-uppercase text-white fw-bolder">
                {{ event.name }}
              </h2>
              <p class="card-text text-white fs-4">{{ event.location }}</p>
              <p class="card-text text-white fs-4">
                {{ new Date(event.startDate).toLocaleString() }}
              </p>
              <p class="card-text text-white">
                {{ event.description }}
              </p>
              <div class="d-flex justify-content-between bottom pt-4">
                <p class="fs-2 text-white">Capacity: {{ event.capacity }}</p>
                <button class="btn btn-success col-3">Attend Event</button>
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

.bottom {
  margin-top: 8em;
}
</style>