<template>
  <div class="flex items-center justify-center min-h-[60vh] px-6">
    <div class="max-w-md w-full">
      <div
        class="bg-error/10 border border-error/20 rounded-2xl p-6 text-center">
        <div
          class="w-12 h-12 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            class="w-6 h-6 text-error"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="font-semibold text-error mb-2">{{ title }}</h3>
        <p class="text-sm text-base-content/70 mb-4">{{ message }}</p>
        <button class="btn btn-error btn-sm" @click="$emit('retry')">
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "加载失败",
  },
  message: {
    type: String,
    default: "请检查网络连接后重试",
  },
  buttonText: {
    type: String,
    default: "重试",
  },
});

defineEmits(["retry"]);
</script>
