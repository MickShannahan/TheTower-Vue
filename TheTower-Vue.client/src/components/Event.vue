<template>
  <div class="col-md-3 p-3">
    <div
      class="card border-dark selectable"
      @click="goToEventDetails()"
      :title="event.name + ' ' + 'Details'"
    >
      <img
        :src="event.coverImg"
        class="card-img"
        :alt="event.name + 'cover image'"
      />
      <div class="card-img-overlay">
        <div class="text-white text-uppercase fw-bolder">
          <p>{{ event.name }}</p>
          <p>{{ event.location }}</p>
          <p>{{ new Date(event.startDate).toLocaleString() }}</p>
          <p>{{ event.capacity }}</p>
          <p v-if="event.isCanceled" class="text-danger">Cancelled</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  props: { event: { type: Object, required: true } },
  setup(props) {
    const router = useRouter();
    return {

      async goToEventDetails() {
        router.push({
          name: "EventDetails",
          params: { id: props.event.id },
        });
      },
    };
  }
}
</script>

<style>
.text-shadow {
  text-shadow: 3px 3px 3px white;
}
</style>