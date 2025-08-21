<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const formData = reactive({
  email: "",
  password: "",
});


const loading = ref(false);

onMounted(() => (errors.value = {}));

async function handleLogin() {
  loading.value = true;        
  await authenticate('login', formData);
    loading.value = false;
        
}
</script>

<template>
  <main class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-sm p-8 bg-white shadow-xl rounded-2xl">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Welcome Back 👋
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
      
        <div>
          <input
            type="text"
            placeholder="Email"
            v-model="formData.email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none 
                   placeholder-gray-400"
          />
          <p v-if="errors.errors" class="text-red-500 text-sm mt-1">
            {{ errors.errors.email[0] }}
          </p>
        </div>

      
        <div>
          <input
            type="password"
            placeholder="Password"
            v-model="formData.password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none 
                   placeholder-gray-400"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{errors.errors.password[0] }}
          </p>
        </div>

      
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg 
                 hover:bg-blue-700 transition duration-200 shadow-md flex items-center justify-center"
        >
          <span
            v-if="loading"
            class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
          ></span>
          {{ loading ? "" : "Login" }}
        </button>
      </form>

     
      <p class="text-center text-sm text-gray-500 mt-6">
        Don’t have an account?
        <RouterLink :to="{ name: 'register' }" class="text-blue-600 hover:underline">
          Register
        </RouterLink>
      </p>
    </div>
  </main>
</template>
