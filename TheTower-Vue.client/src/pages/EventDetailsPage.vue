<template>
  <div class="row justify-content-center mt-3">
    <div class="col-12 p-4">
      <div class="card banner mb-3">
        <div class="row g-0 elevation-4">
          <div class="col-md-4 my-4 p-3 pt-4">
            <img
              :src="event.coverImg"
              class="img-fluid rounded"
              :alt="event.name + ' ' + 'image'"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div class="dropdown" v-if="event.creator.id === account.id">
                <div
                  class="dropdown-toggle selectable text-end"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="eventDropdown"
                  title="edit or delete event"
                >
                  <span class="mx-3 text-white display-3">...</span>
                </div>
                <div class="dropdown-menu p-0" aria-labelledby="eventDropdown">
                  <div
                    class="hoverable selectable"
                    data-bs-toggle="modal"
                    data-bs-target="#edit-event-modal"
                  >
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
              <h2
                class="
                  card-title
                  text-uppercase text-white text-shadow
                  fw-bolder
                "
              >
                {{ event.name }}
              </h2>
              <p class="card-text text-white text-shadow fs-4">
                {{ event.location }}
              </p>
              <p class="card-text text-white text-shadow fs-4">
                {{ new Date(event.startDate).toLocaleString() }}
              </p>
              <p class="card-text text-white text-shadow">
                {{ event.description }}
              </p>
              <div
                class="d-flex justify-content-between bottom pt-4"
                v-if="!event.isCanceled"
              >
                <p class="fs-2 text-white text-shadow">
                  Capacity: {{ event.capacity }}
                </p>
                <button
                  class="btn btn-info col-3 disabled"
                  @click="addAttendee()"
                  :aria-label="'attend' + ' ' + event.name"
                  v-if="event.capacity == 0"
                >
                  <!-- v-if="account.id != attendees.account.id" -->
                  Event is Sold Out
                </button>
                <button
                  v-else
                  class="btn btn-success col-3"
                  @click="addAttendee()"
                  :aria-label="'attend' + ' ' + event.name"
                >
                  <!-- v-if="account.id != attendees.account.id" -->
                  Attend Event
                </button>
                <!-- <button
                  class="btn btn-success col-3"
                  @click="removeAttendee()"
                  :aria-label="'unattend' + ' ' + event.name"
                  v-else
                >
                  Unattend Event
                </button> -->
              </div>
              <div v-else>
                <p class="fs-1 text-center text-danger fw-bold bg-dark">
                  EVENT IS CANCELLED
                </p>
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
        <p>Attending:</p>
        <div v-for="a in attendees" :key="a.id" class="p-1">
          <p>
            <img
              class="user-img"
              :title="a.account.name"
              :src="a.account.picture"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-5 pt-4 justify-content-center">
    <div class="col-md-10">
      <div class="card">
        <form @submit.prevent="createComment()" class="p-3">
          <div class="form-group mt-3">
            <label for="inputComment" class="text-end"
              >Join the conversation...</label
            >
            <textarea
              placeholder="..."
              type="text"
              class="form-control"
              name="inputComment"
              id="inputComment"
              rows="5"
              :aria-label="'create comment for' + ' ' + event.name"
              v-model="editable.body"
              required
            ></textarea>
          </div>
          <div class="col-12 d-flex justify-content-end pt-2">
            <button class="btn btn-success">Create</button>
          </div>
        </form>
        <div>
          <Comment v-for="c in comments" :key="c" :comment="c" />
        </div>
      </div>
    </div>
  </div>
  <EditEventModal id="edit-event-modal" />
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { AppState } from '../AppState';
import { onMounted } from '@vue/runtime-core';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService';
import { attendeesService } from '../services/AttendeesService';
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
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
      editable,
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
      },
      async createComment() {
        try {
          await commentsService.createComment(editable.value, route.params.id);
          editable.value = {};
        } catch (error) {
          Pop.toast(error.message, "error")
        }
      },
      async addAttendee() {
        try {
          await this.attendeesService.addAttendee()
        } catch (error) {
          Pop.toast(error.message, "error")
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
  /* backdrop-filter: blur(1000px); */
}

.text-shadow {
  text-shadow: 4px 4px 4px black;
}

.bottom {
  margin-top: 8em;
}

.user-img {
  height: 40px;
  width: 40px;
  border-radius: 20px;
}
</style>