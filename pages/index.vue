<template>
  <div class="bg-base-100 min-h-screen">
    <!-- 初始加载状态 (for source list) -->
    <div v-if="initialLoading" class="flex justify-center pt-16">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- 初始错误状态 (for source list) -->
    <div v-else-if="error" class="alert alert-error max-w-2xl mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ error }}</span>
      <button class="btn btn-sm" @click="reloadPage">重试</button>
    </div>

    <!-- 热榜版块 -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <section
        v-for="source in sources"
        :key="source.id"
        :ref="(el) => (sourceElements[source.id] = el)"
        :data-source-id="source.id"
        class="min-h-[20rem] bg-base-200 p-6 rounded-box"
        :id="source.id">
        <h2 class="text-2xl font-bold mb-4 flex items-center justify-between">
          <span class="flex items-center">
            <span v-if="source.icon" class="mr-3" v-html="source.icon"></span>
            {{ source.name }}
          </span>
          <button
            class="btn btn-ghost btn-sm btn-circle"
            @click="refreshSource(source)"
            :disabled="loadingStates[source.id]">
            <svg
              v-if="!loadingStates[source.id]"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10 15a1 1 0 01-1-1v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 01-1 1z"
                clip-rule="evenodd" />
            </svg>
            <span v-else class="loading loading-spinner loading-xs"></span>
          </button>
        </h2>

        <!-- Per-section loading spinner -->
        <div
          v-if="loadingStates[source.id]"
          class="flex justify-center items-center pt-16">
          <span class="loading loading-spinner loading-md text-primary"></span>
        </div>

        <!-- Content list -->
        <div
          v-else-if="
            hotItemsBySource[source.id] &&
            hotItemsBySource[source.id].length > 0
          ">
          <ol class="list-none space-y-2 max-h-96 overflow-y-auto">
            <li
              v-for="item in hotItemsBySource[source.id]"
              :key="item.id"
              class="flex items-baseline p-1 rounded-md hover:bg-base-300">
              <span
                class="text-sm font-medium text-base-content/60 w-8 text-center"
                >{{ item.rank }}</span
              >
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="ml-4 text-base-content hover:text-primary transition-colors">
                {{ item.title }}
              </a>
            </li>
          </ol>
        </div>

        <!-- Empty/Error state for this section -->
        <div
          v-else-if="!loadingStates[source.id] && hotItemsBySource[source.id]"
          class="text-center py-16 text-base-content/60">
          <p>(´･_･`) 未能加载此热榜</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const sources = ref([]);
const hotItemsBySource = ref({});
const loadingStates = ref({});
const initialLoading = ref(false);
const error = ref(null);
const sourceElements = ref({});

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
    sources.value = await $fetch("/api/sources");
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

watch(sources, (newSources) => {
  if (newSources && newSources.length > 0) {
    nextTick(() => {
      setupObserver();
    });
  }
});

onMounted(loadInitialData);

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
