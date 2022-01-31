<template>
  <div class="col-3">
    <div class="card">
      <img src="https://thiscatdoesnotexist.com" class="card-img" alt="..." />
      <div class="card-img-overlay">
        <div>
          <p>event name</p>
          <p>event location</p>
          <p>event date/time</p>
        </div>
        <div class="d-flex justify-content-end align-items-end">
          <p>event capacity</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { event: { type: Object, required: true } },
  setup() {
    return {};
  }
}
</script>

<style>
</style>