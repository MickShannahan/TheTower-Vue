<template>
  <div class="row justify-content-center mt-3">
    <div class="col-11 p-0 banner elevation-4">
      <div class="blur h-100">
        <div class="row g-0 p-1">
          <div class="col-md-4 my-4 p-3 pt-4">
            <img :src="event.coverImg" class="img-fluid rounded" :alt="event.name + ' ' + 'image'" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div class="dropdown" v-if="event.creatorId === account.id">
                <div class="dropdown-toggle selectable text-end" data-bs-toggle="dropdown" aria-expanded="false"
                  id="eventDropdown" title="edit or delete event">
                  <span class="mx-3 text-white display-3">...</span>
                </div>
                <div class="dropdown-menu p-0" aria-labelledby="eventDropdown">
                  <div class="hoverable selectable" data-bs-toggle="modal" data-bs-target="#edit-event-modal">
                    Edit Event
                  </div>

                  <div class="hoverable selectable text-danger" @click="cancelEvent()">
                    Cancel Event
                  </div>
                </div>
              </div>
              <h2 class="
                  card-title
                  text-uppercase text-white text-shadow
                  fw-bolder
                ">
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
              <div class="d-flex justify-content-between bottom pt-4" v-if="!event.isCanceled">
                <p class="fs-2 text-white text-shadow">
                  Capacity: {{ event.capacity }}
                </p>
                <button class="btn btn-info col-3 disabled" :aria-label="'attend' + ' ' + event.name"
                  v-if="event.capacity == 0">
                  Event is Sold Out
                </button>
                <button class="btn btn-success col-3 disabled" :aria-label="'attend' + ' ' + event.name"
                  v-else-if="isAttending">
                  Enjoy the Show!
                </button>

                <button v-else class="btn btn-success col-3" @click="addAttendee()"
                  :aria-label="'attend' + ' ' + event.name">
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
      <div class="card bg-primary p-2 darken-10 elevation-2">
        <p>Attending:</p>
        <div class="d-flex">
          <div v-for="a in attendees" :key="a.id" class="p-1">
            <p class="d-flex">
              <img class="user-img" :title="a.account.name" :src="a.account.picture" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-5 pt-4 justify-content-center">
    <div class="col-md-10">
      <div class="card">
        <form @submit.prevent="createComment()" class="p-3">
          <div class="form-group mt-3">
            <label for="inputComment" class="text-end">Join the conversation...</label>
            <textarea placeholder="..." type="text" class="form-control" name="inputComment" id="inputComment" rows="5"
              :aria-label="'create comment for' + ' ' + event.name" v-model="editable.body" required></textarea>
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
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { attendeesService } from '../services/AttendeesService';
import { commentsService } from '../services/CommentsService';
import { eventsService } from '../services/EventsService';
import { socketService } from '../services/SocketService.js';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    onMounted(async () => {
      try {
        await eventsService.getEventById(route.params.id)
        await eventsService.getEventComments(route.params.id)
        await eventsService.getEventAttendees(route.params.id)
        socketService.joinRoom(`event-${AppState.activeEvent.id}`)
      } catch (error) {
        Pop.toast(error.message, "error"); logger.error(error)
      }
    })
    return {
      route,
      editable,
      event: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      attendees: computed(() => AppState.attendees),
      comments: computed(() => AppState.comments),
      isAttending: computed(() => AppState.attendees.find(a => a.accountId == AppState.account.id)),
      bgImage: computed(() => `url(${AppState.activeEvent.coverImg})`),

      async cancelEvent() {
        if (Pop.confirm('Are you sure you would like to cancel this event?')) {
          try {
            await eventsService.cancelEvent(route.params.id)
          } catch (error) {
            Pop.toast(error.message, "error"); logger.error(error)
          }
        }
      },
      async createComment() {
        try {
          await commentsService.createComment(route.params.id, editable.value);
          editable.value = {};
        } catch (error) {
          Pop.toast(error.message, "error"); logger.error(error)
          logger.error(error)
        }
      },
      async addAttendee() {
        try {
          let body = { eventId: route.params.id }
          await attendeesService.addAttendee(body)
        } catch (error) {
          Pop.toast(error.message, "error"); logger.error(error)
        }
      }

    };
  }
}
</script>

<style>
.banner {
  min-height: 60vh;
  background-image: v-bind(bgImage);
  background-position: center;
  background-size: cover;
}

.blur {
  backdrop-filter: blur(35px) brightness(60%) contrast(70%);
}

.text-shadow {
  text-shadow: 0px 0px 4px rgba(4, 4, 17, 0.806);
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
