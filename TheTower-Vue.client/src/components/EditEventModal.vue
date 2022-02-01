<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark">Edit Event</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editEvent()">
            <div class="my-2">
              <h5>Event Name</h5>
              <input
                v-model="editable.name"
                type="text"
                class="form-text rounded w-100 border-1 border-light"
                required="true"
              />
            </div>
            <h5>Event Description</h5>
            <input
              v-model="editable.description"
              type="text"
              class="form-text w-100 border-1 border-light"
              required="true"
            />

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-outline-primary">
                Edit Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { logger } from '../utils/Logger';
import { useRoute } from 'vue-router';
import { watchEffect } from '@vue/runtime-core';
import { AppState } from '../AppState';

export default {

  setup() {
    const route = useRoute();
    const editable = ref({});
    watchEffect(() => {
      editable.value = { ...AppState.activeEvent }
    })
    return {
      editable,
      route,
      async editEvent() {
        try {
          await eventsService.editEvent(editable.value),
            Modal.getOrCreateInstance(document.getElementById('edit-event-modal')).hide()
        } catch (error) {
          Pop.toast(error.message, "error"); logger.error(error)
        }
      }
    };
  }

}
</script>

<style>
</style>