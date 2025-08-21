<script setup>
import { usePostsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

const { errors } = storeToRefs(usePostsStore());
const { createPost } = usePostsStore();

const formData = reactive({
  product_name: "",
  description: "",
  price: "",
  quantity: "",
});

const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  await createPost(formData);
  loading.value = false;
};
</script>

<template>
  <main class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">
        🛒 Add New Product
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Product Name -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Product Name</label>
          <input
            type="text"
            v-model="formData.product_name"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">
            {{ errors.name[0] }}
          </p>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            rows="4"
            v-model="formData.description"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          ></textarea>
          <p v-if="errors.description" class="text-red-500 text-sm mt-1">
            {{ errors.description[0] }}
          </p>
        </div>

        <!-- Price -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Price ($)</label>
          <input
            type="number"
            step="0.01"
            v-model="formData.price"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
          <p v-if="errors.price" class="text-red-500 text-sm mt-1">
            {{ errors.price[0] }}
          </p>
        </div>

        <!-- Quantity -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Quantity</label>
          <input
            type="number"
            v-model="formData.quantity"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
          <p v-if="errors.quantity" class="text-red-500 text-sm mt-1">
            {{ errors.quantity[0] }}
          </p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-300 flex items-center justify-center"
        >
          <span v-if="loading" class="animate-spin mr-2">⏳</span>
          {{ loading ? "Creating..." : "Create Product" }}
        </button>
      </form>
    </div>
  </main>
</template>
