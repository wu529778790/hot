<template>
  <section
    :ref="(el) => $emit('setElementRef', el)"
    :key="source.id"
    :data-source-id="source.id"
    class="group relative bg-white/50 dark:bg-base-200/50 backdrop-blur-sm border border-base-300/50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    :id="source.id">
    <!-- 卡片头部 -->
    <header class="relative p-6 pb-4 border-b border-base-300/30">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3 flex-1 min-w-0">
          <div
            v-if="source.icon"
            class="w-8 h-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0"
            v-html="source.icon"></div>
          <div class="min-w-0 flex-1">
            <h3 class="font-semibold text-base text-base-content truncate">
              {{ source.name }}
            </h3>
            <div class="flex items-center space-x-2 mt-1">
              <div
                class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-xs text-base-content/60">实时更新</span>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-1 flex-shrink-0">
          <button
            class="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary/10"
            @click="$emit('refresh', source)"
            :disabled="loading"
            :title="`刷新 ${source.name}`">
            <svg
              v-if="!loading"
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
            <div
              v-else
              class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </button>

          <button
            class="drag-handle btn btn-ghost btn-sm btn-circle cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-base-300"
            :title="`拖拽调整 ${source.name} 顺序`">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 8h16M4 16h16" />
              <circle cx="9" cy="8" r="1" />
              <circle cx="15" cy="8" r="1" />
              <circle cx="9" cy="16" r="1" />
              <circle cx="15" cy="16" r="1" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 加载进度条 -->
      <div v-if="loading" class="mt-4">
        <div class="w-full bg-base-300/30 rounded-full h-1 overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"
            style="width: 60%"></div>
        </div>
      </div>
    </header>

    <!-- 内容区域 -->
    <div class="relative min-h-[300px]">
      <!-- 加载状态 -->
      <div
        v-if="loading"
        class="absolute inset-0 flex flex-col items-center justify-center space-y-3">
        <div class="relative">
          <div
            class="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p class="text-sm text-base-content/60">正在加载...</p>
      </div>

      <!-- 内容列表 -->
      <div
        v-else-if="items && items.length > 0"
        class="p-4 space-y-1 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        <div
          v-for="(item, index) in items.slice(0, 15)"
          :key="item.id"
          class="group/item relative p-3 rounded-xl hover:bg-base-100/50 dark:hover:bg-base-300/30 transition-all duration-200 cursor-pointer border border-transparent hover:border-base-300/30"
          @click="$emit('openLink', item.url)">
          <div class="flex items-start space-x-3">
            <!-- 排名 -->
            <div class="flex-shrink-0">
              <div
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                :class="getRankStyle(item.rank || index + 1)">
                {{ item.rank || index + 1 }}
              </div>
            </div>

            <!-- 内容 -->
            <div class="flex-1 min-w-0">
              <h4
                class="text-sm font-medium text-base-content leading-tight line-clamp-2 group-hover/item:text-primary transition-colors">
                {{ item.title }}
              </h4>
              <div class="flex items-center space-x-2 mt-1">
                <div
                  v-if="item.extra?.info"
                  class="text-xs text-base-content/50">
                  {{ item.extra.info }}
                </div>
                <div v-if="item.createdAt" class="text-xs text-base-content/50">
                  {{ formatTime(item.createdAt) }}
                </div>
              </div>
            </div>

            <!-- 外部链接图标 -->
            <div
              class="flex-shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity">
              <svg
                class="w-4 h-4 text-base-content/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <EmptyState
        v-else-if="!loading && items"
        title="暂无内容"
        subtitle="请稍后刷新重试" />

      <!-- 错误状态 -->
      <div
        v-else-if="!loading && items === null"
        class="absolute inset-0 flex flex-col items-center justify-center space-y-3 p-6">
        <div
          class="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
          <svg
            class="w-6 h-6 text-error/60"
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
        <div class="text-center">
          <p class="text-sm font-medium text-base-content/60">加载失败</p>
          <button
            class="btn btn-error btn-xs mt-2"
            @click="$emit('refresh', source)">
            重试
          </button>
        </div>
      </div>

      <!-- 卡片底部渐变效果 -->
      <div
        class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
    </div>
  </section>
</template>

<script setup>
import EmptyState from "./EmptyState.vue";

const props = defineProps({
  source: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["refresh", "openLink", "setElementRef"]);

// 排名样式
const getRankStyle = (rank) => {
  if (rank === 1)
    return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg";
  if (rank === 2)
    return "bg-gradient-to-r from-gray-300 to-gray-400 text-white shadow-md";
  if (rank === 3)
    return "bg-gradient-to-r from-orange-300 to-orange-400 text-white shadow-sm";
  if (rank <= 10)
    return "bg-gradient-to-r from-primary/20 to-primary/30 text-primary font-semibold";
  return "bg-base-300/50 text-base-content/70";
};

// 格式化时间
const formatTime = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  return `${days}天前`;
};
</script>
