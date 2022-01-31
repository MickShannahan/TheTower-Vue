<template>
  <div class="sidebar d-flex justify-content-center bg-dark">
    <div class="mt-5">
      <img
        @click="goToProfile()"
        class="account-img ms-3"
        :src="account.picture"
        :alt="account.name + 'picture'"
        :title="account.name + 'picture'"
      />
      <div class="p-1 mt-2">
        <p>{{ account.name }}</p>
        <button
          class="
            btn
            selectable
            text-success
            lighten-30
            text-uppercase
            my-2 my-lg-0
          "
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>
        <div class="dropdown my-2 my-lg-0" v-else>
          <div
            class="dropdown-toggle selectable"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="authDropdown"
          ></div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            aria-labelledby="authDropdown"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Manage Account
              </div>
            </router-link>
            <div
              class="
                list-group-item list-group-item-action
                hoverable
                text-danger
              "
              @click="logout"
            >
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    return {
      async goToProfile() {
        router.push({
          name: "Account"
        });
      },
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      router,
    };
  },
};
</script>

<style>
.sidebar {
  min-height: 100vh;
  min-width: 100%;
}

.account-img {
  height: 75px;
  width: 75px;
  border-radius: 50px;
}
</style>