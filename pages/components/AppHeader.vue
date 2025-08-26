<template>
  <header
    class="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300/50">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <svg
              class="w-5 h-5 text-primary-content"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <div>
            <h1
              class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {{ title || "热榜聚合" }}
            </h1>
            <p class="text-xs text-base-content/60">
              {{ subtitle || "实时聚合各大平台热门内容" }}
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <div v-if="showStats" class="text-xs text-base-content/50">
            共 {{ sourceCount || 0 }} 个数据源
          </div>
          <button
            class="btn btn-ghost btn-sm btn-circle"
            @click="$emit('refresh')"
            :title="refreshTitle || '刷新全部'">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "热榜聚合",
  },
  subtitle: {
    type: String,
    default: "实时聚合各大平台热门内容",
  },
  sourceCount: {
    type: Number,
    default: 0,
  },
  showStats: {
    type: Boolean,
    default: true,
  },
  refreshTitle: {
    type: String,
    default: "刷新全部",
  },
});

defineEmits(["refresh"]);
</script>
