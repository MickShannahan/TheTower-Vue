<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <div class="d-flex align-items-center">
            <img
              class="user-img"
              :src="comment.creator.picture"
              :alt="comment.creator.name"
              :title="comment.creator.name"
            />
            <p class="fs-6 ps-3">{{ comment.creator.name }}</p>
          </div>
          <div class="p-2 ps-4 mt-1">
            <p class="fs-4">{{ comment.body }}</p>
          </div>
          <i
            v-if="comment.creator.id === account.id"
            title="delete comment"
            aria-label="delete comment"
            class="
              mdi mdi-trash-can-outline
              d-flex
              justify-content-end
              selectable
            "
            @click="deleteComment"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService';
export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    return {
      users: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async deleteComment() {
        try {
          if (Pop.confirm('Are you sure you want to delete this comment?')) {
            await commentsService.deleteComment(props.comment.id)
          }
        } catch (error) {
          Pop.toast(error.message, "error")
        }
      }
    };
  }

}
</script>

<style>
.user-img {
  height: 50px;
  width: 50px;
  border-radius: 50px;
}
</style>