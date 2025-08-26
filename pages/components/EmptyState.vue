<template>
  <div
    class="absolute inset-0 flex flex-col items-center justify-center space-y-3 p-6">
    <div
      class="w-12 h-12 bg-base-300/30 rounded-full flex items-center justify-center">
      <svg
        class="w-6 h-6 text-base-content/40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.882-6.083-2.337" />
      </svg>
    </div>
    <div class="text-center">
      <p class="text-sm font-medium text-base-content/60">
        {{ title }}
      </p>
      <p class="text-xs text-base-content/40 mt-1">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "暂无内容",
  },
  subtitle: {
    type: String,
    default: "请稍后刷新重试",
  },
});
</script>
