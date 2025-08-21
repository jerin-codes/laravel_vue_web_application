<script setup>
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
import LoginView from "./views/Auth/LoginView.vue"
import { ref } from "vue";
// import { ref } from "vue";


const authStore = useAuthStore();
const mobileMenuOpen = ref(false);
const loggingOut = ref(false); 

const handleLogout = async () => {
  loggingOut.value = true;
  await authStore.logout();
  loggingOut.value = false;
};
</script>

<template>
  <div>
    <!-- If user is logged in -->
    <div v-if="authStore.user">
      <!-- Navbar -->
      <header class="bg-gray-900 text-white shadow-md">
        <nav class="container mx-auto flex justify-between items-center px-6 py-4">
          <!-- Left: Logo / Home -->
          <RouterLink
            :to="{ name: 'home' }"
            class="text-xl font-bold tracking-wide text-blue-400 hover:text-blue-300"
          >
           My,Home
          </RouterLink>

          <!-- Desktop Links -->
          <div class="hidden md:flex items-center space-x-8">
            
            <!-- <RouterLink :to="{ name: 'create' }" class="nav-link">New product</RouterLink> -->
            <p class="text-sm text-slate-300">Hi, {{ authStore.user.name }}</p>
           <form @submit.prevent="handleLogout">
  <button
    type="submit"
    class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition flex items-center justify-center"
    :disabled="loggingOut"
  >
    <span v-if="loggingOut" class="animate-spin mr-2">⏳</span>
    {{ loggingOut ? "Logging out..." : "Logout" }}
  </button>
</form>

          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden focus:outline-none"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </nav>

        <!-- Mobile Dropdown -->
        <div
          v-if="mobileMenuOpen"
          class="md:hidden bg-gray-800 px-6 py-4 space-y-4"
        >
          <RouterLink :to="{ name: 'home' }" class="block nav-link">Home</RouterLink>
          <RouterLink :to="{ name: 'create' }" class="block nav-link">New Post</RouterLink>
          <p class="text-sm text-slate-300">Hi, {{ authStore.user.name }}</p>
          <form @submit.prevent="authStore.logout">
            <button
              class="w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      <!-- Page Content -->
      
    </div>

    <!-- If no user, show Login -->
    <!-- <div v-else>
      <LoginView />
    </div> -->
    <main class="container mx-auto px-6 py-6">
      <RouterView />
    </main>
  </div>
</template>

<style>
.nav-link {
  @apply text-slate-300 hover:text-white transition;
}
</style>
