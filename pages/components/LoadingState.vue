<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
    <div class="relative">
      <div
        class="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <div
        class="absolute inset-0 w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"
        style="animation-direction: reverse; animation-duration: 1.5s"></div>
    </div>
    <p class="text-base-content/60 font-medium">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: "正在加载...",
  },
});
</script>
