<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-secondary fw-bolder">CREATE NEW EVENT</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createEvent()" class="row g-3">
            <div class="col-12">
              <label for="inputEventName" class="form-label">Event Name</label>
              <input type="text" class="form-control" id="inputEventName" />
            </div>
            <div class="col-12">
              <label for="inputEventDescription" class="form-label"
                >Description</label
              >
              <textarea
                name="eventDescription"
                rows="5"
                type="text"
                class="form-control"
                id="inputEventDescription"
              ></textarea>
            </div>
            <div class="col-12">
              <label for="inputEventImage" class="form-label"
                >Event Image</label
              >
              <input
                type="url"
                class="form-control"
                id="inputEventImage"
                placeholder="Image Url..."
              />
            </div>
            <div class="col-12">
              <label for="inputEventLocation" class="form-label"
                >Event Location</label
              >
              <input
                type="text"
                class="form-control"
                id="inputEventLocation"
                placeholder="Location"
              />
            </div>
            <div class="col-md-6">
              <label for="inputEventDate" class="form-label">Start Date</label>
              <input type="date" class="form-control" id="inputEventDate" />
            </div>
            <div class="col-md-4">
              <label for="inputEventType" class="form-label">Event Type</label>
              <select id="inputEventType" class="form-select">
                <option selected>Type...</option>
                <option>Concert</option>
                <option>Sport</option>
                <option>Convention</option>
                <option>Digital</option>
                <option>Expos</option>
              </select>
            </div>
            <div class="col-md-2">
              <label for="inputEventCapacity" class="form-label"
                >Capacity</label
              >
              <input
                type="number"
                class="form-control"
                id="inputEventCapacity"
              />
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-dark"
                data-bs-dismiss="modal"
                aria-label="close"
              >
                Close
              </button>
              <button type="submit" class="btn btn-dark" aria-label="save">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  }

}
</script>

<style>
</style>

// v-model="editable.type"