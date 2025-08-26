<template>
  <div
    class="min-h-screen bg-gradient-to-br from-base-100 via-base-50 to-base-100">
    <!-- 优雅的头部区域 -->
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
                热榜聚合
              </h1>
              <p class="text-xs text-base-content/60">
                实时聚合各大平台热门内容
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="text-xs text-base-content/50">
              共 {{ sources.length }} 个数据源
            </div>
            <button
              class="btn btn-ghost btn-sm btn-circle"
              @click="reloadPage"
              title="刷新全部">
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

    <!-- 初始加载状态 -->
    <div
      v-if="initialLoading"
      class="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div class="relative">
        <div
          class="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div
          class="absolute inset-0 w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"
          style="animation-direction: reverse; animation-duration: 1.5s"></div>
      </div>
      <p class="text-base-content/60 font-medium">正在加载数据源...</p>
    </div>

    <!-- 初始错误状态 -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-[60vh] px-6">
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
          <h3 class="font-semibold text-error mb-2">加载失败</h3>
          <p class="text-sm text-base-content/70 mb-4">{{ error }}</p>
          <button class="btn btn-error btn-sm" @click="reloadPage">
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
            重试
          </button>
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <main v-else class="container mx-auto px-6 py-8">
      <draggable
        v-model="sources"
        item-key="id"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
        handle=".drag-handle"
        animation="300"
        ghost-class="opacity-50"
        chosen-class="ring-2 ring-primary ring-offset-2 ring-offset-base-100">
        <template #item="{ element: source }">
          <section
            :ref="(el) => (sourceElements[source.id] = el)"
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
                    <h3
                      class="font-semibold text-base text-base-content truncate">
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
                    @click="refreshSource(source)"
                    :disabled="loadingStates[source.id]"
                    :title="`刷新 ${source.name}`">
                    <svg
                      v-if="!loadingStates[source.id]"
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
              <div v-if="loadingStates[source.id]" class="mt-4">
                <div
                  class="w-full bg-base-300/30 rounded-full h-1 overflow-hidden">
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
                v-if="loadingStates[source.id]"
                class="absolute inset-0 flex flex-col items-center justify-center space-y-3">
                <div class="relative">
                  <div
                    class="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
                <p class="text-sm text-base-content/60">正在加载...</p>
              </div>

              <!-- 内容列表 -->
              <div
                v-else-if="
                  hotItemsBySource[source.id] &&
                  hotItemsBySource[source.id].length > 0
                "
                class="p-4 space-y-1 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
                <div
                  v-for="(item, index) in hotItemsBySource[source.id].slice(
                    0,
                    15
                  )"
                  :key="item.id"
                  class="group/item relative p-3 rounded-xl hover:bg-base-100/50 dark:hover:bg-base-300/30 transition-all duration-200 cursor-pointer border border-transparent hover:border-base-300/30"
                  @click="openLink(item.url)">
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
                        <div
                          v-if="item.createdAt"
                          class="text-xs text-base-content/50">
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
              <div
                v-else-if="
                  !loadingStates[source.id] && hotItemsBySource[source.id]
                "
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
                    暂无内容
                  </p>
                  <p class="text-xs text-base-content/40 mt-1">
                    请稍后刷新重试
                  </p>
                </div>
              </div>

              <!-- 错误状态 -->
              <div
                v-else-if="
                  !loadingStates[source.id] &&
                  hotItemsBySource[source.id] === null
                "
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
                  <p class="text-sm font-medium text-base-content/60">
                    加载失败
                  </p>
                  <button
                    class="btn btn-error btn-xs mt-2"
                    @click="refreshSource(source)">
                    重试
                  </button>
                </div>
              </div>
            </div>

            <!-- 卡片底部渐变效果 -->
            <div
              class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
          </section>
        </template>
      </draggable>
    </main>
  </div>
</template>

<script setup>
import draggable from "vuedraggable";

const sources = ref([]);
const hotItemsBySource = ref({});
const loadingStates = ref({});
const initialLoading = ref(false);
const error = ref(null);
const sourceElements = ref({});

const SOURCE_ORDER_KEY = "hot-list-source-order";

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

// 打开链接
const openLink = (url) => {
  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

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

const fetchHotListForSource = async (source, isRefresh = false) => {
  if (loadingStates.value[source.id]) return;
  if (
    !isRefresh &&
    hotItemsBySource.value[source.id] &&
    hotItemsBySource.value[source.id].length > 0
  ) {
    return;
  }

  loadingStates.value = { ...loadingStates.value, [source.id]: true };
  try {
    const items = await $fetch("/api/hot-list", { params: { id: source.id } });
    hotItemsBySource.value = {
      ...hotItemsBySource.value,
      [source.id]: items || [],
    };
  } catch (err) {
    console.error(`Failed to fetch hot list for ${source.id}:`, err);
    hotItemsBySource.value = { ...hotItemsBySource.value, [source.id]: [] };
  } finally {
    loadingStates.value = { ...loadingStates.value, [source.id]: false };
  }
};

const refreshSource = async (source) => {
  await fetchHotListForSource(source, true);
};

let observer;
const setupObserver = () => {
  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const sourceId = entry.target.dataset.sourceId;
          const source = sources.value.find((s) => s.id === sourceId);
          if (source) {
            fetchHotListForSource(source);
            observer.unobserve(entry.target);
          }
        }
      }
    },
    { rootMargin: "300px 0px 300px 0px" }
  );

  const elements = Object.values(sourceElements.value);
  if (elements.length > 0) {
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });
  }
};

const loadInitialData = async () => {
  initialLoading.value = true;
  error.value = null;
  try {
    let sourceList = await $fetch("/api/sources");
    const savedOrder = JSON.parse(localStorage.getItem(SOURCE_ORDER_KEY));

    if (savedOrder && Array.isArray(savedOrder)) {
      const sourceMap = new Map(sourceList.map((s) => [s.id, s]));
      const orderedList = [];
      savedOrder.forEach((id) => {
        if (sourceMap.has(id)) {
          orderedList.push(sourceMap.get(id));
          sourceMap.delete(id);
        }
      });
      orderedList.push(...sourceMap.values());
      sourceList = orderedList;
    }

    sources.value = sourceList;
  } catch (err) {
    console.error("Failed to fetch sources:", err);
    error.value = "获取数据源列表失败，请检查网络连接。";
  } finally {
    initialLoading.value = false;
  }
};

const reloadPage = () => {
  window.location.reload();
};

let observerInitialized = false;
watch(
  sources,
  (newSources) => {
    if (!newSources || newSources.length === 0) return;

    const order = newSources.map((s) => s.id);
    localStorage.setItem(SOURCE_ORDER_KEY, JSON.stringify(order));

    if (!observerInitialized) {
      nextTick(() => {
        setupObserver();
        observerInitialized = true;
      });
    }
  },
  { deep: true }
);

onMounted(loadInitialData);

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
