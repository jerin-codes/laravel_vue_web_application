<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();
import { ref } from "vue";

const loading = ref(false); 

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

onMounted(() => (errors.value = {}));

const handleRegister = async () => {
  loading.value = true;
  await authenticate('register', formData);
  // loading.value = false;
};
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-50">
    <div
      class="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200"
    >
    
      <h1 class="text-2xl font-bold text-gray-800 text-center">
        Create a new account
      </h1>
      <p class="text-sm text-gray-500 text-center">
        Fill in the details below to register
      </p>

      <form
        @submit.prevent="authenticate('register', formData)"
        class="space-y-5"
      >
             <div>
          <input
            type="text"
            placeholder="Full Name"
            v-model="formData.name"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">
            {{ errors.name[0] }}
          </p>
        </div>

      
        <div>
          <input
            type="email"
            placeholder="Email Address"
            v-model="formData.email"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email[0] }}
          </p>
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            v-model="formData.password"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ errors.password[0] }}
          </p>
        </div>

      
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            v-model="formData.password_confirmation"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

      
        <button
  type="submit"
  @click.prevent="handleRegister"
  :disabled="loading"
  class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md flex items-center justify-center"
>
  <span v-if="loading" class="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
  {{ loading ? "Registering..." : "Register" }}
</button>
      </form>

     
      <p class="text-center text-sm text-gray-500">
        Already have an account?
        <a href="/login" class="text-indigo-600 font-medium hover:underline"
          >Login</a
        >
      </p>
    </div>
  </main>
</template>
