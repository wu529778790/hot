<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary mb-2">🔥 实时热榜</h1>
      <p class="text-base-content/70">聚合多个平台的热门内容，实时更新</p>
    </div>

    <!-- 数据源选择器 -->
    <div class="flex justify-center">
      <div class="join">
        <input
          class="join-item btn"
          type="radio"
          name="source"
          value=""
          aria-label="全部"
          v-model="selectedSource"
          @change="fetchHotItems" />
        <input
          v-for="source in sources"
          :key="source.id"
          class="join-item btn"
          type="radio"
          name="source"
          :value="source.id"
          :aria-label="source.name"
          v-model="selectedSource"
          @change="fetchHotItems" />
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="alert alert-error">
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
    </div>

    <!-- 热榜列表 -->
    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in hotItems"
        :key="item.id"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
          <!-- 排名和分数 -->
          <div class="flex justify-between items-start mb-2">
            <div class="badge badge-primary badge-lg">{{ item.rank }}</div>
            <div class="text-right">
              <div class="text-sm text-base-content/70">热度</div>
              <div class="font-bold text-primary">{{ item.score }}</div>
            </div>
          </div>

          <!-- 标题 -->
          <h2 class="card-title text-base">
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="link link-hover">
              {{ item.title }}
            </a>
          </h2>

          <!-- 来源和评论数 -->
          <div class="flex justify-between items-center mt-3">
            <div class="badge badge-outline">
              {{ getSourceName(item.source) }}
            </div>
            <div v-if="item.comments" class="text-sm text-base-content/70">
              💬 {{ item.comments }}
            </div>
          </div>

          <!-- 更新时间 -->
          <div class="text-xs text-base-content/50 mt-2">
            {{ formatTime(item.updatedAt) }}
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div
      v-if="!loading && !error && hotItems.length === 0"
      class="text-center py-12">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-semibold mb-2">暂无数据</h3>
      <p class="text-base-content/70">请稍后刷新或选择其他数据源</p>
    </div>

    <!-- 刷新按钮 -->
    <div class="text-center">
      <button
        class="btn btn-primary"
        @click="refreshHotItems"
        :disabled="loading">
        <span v-if="loading" class="loading loading-spinner loading-sm"></span>
        刷新热榜
      </button>
    </div>
  </div>
</template>

<script setup>
// 响应式数据
const selectedSource = ref("");
const hotItems = ref([]);
const sources = ref([]);
const loading = ref(false);
const error = ref(null);

// 获取数据源名称
const getSourceName = (sourceId) => {
  const source = sources.value.find((s) => s.id === sourceId);
  return source?.name || sourceId;
};

// 格式化时间
const formatTime = (date) => {
  if (!date) return '';
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

// 获取热榜数据
const fetchHotItems = async () => {
  if (!selectedSource.value) return;
  loading.value = true;
  error.value = null;

  try {
    const data = await $fetch("/api/hot-list", { 
      params: { id: selectedSource.value }
    });
    hotItems.value = data;
  } catch (err) {
    console.error("Failed to fetch hot items:", err);
    error.value = err.data?.statusMessage || "获取数据失败，请稍后重试";
    hotItems.value = [];
  } finally {
    loading.value = false;
  }
};

// 获取数据源列表
const fetchSources = async () => {
  try {
    sources.value = await $fetch("/api/sources");
    if (sources.value.length > 0 && !selectedSource.value) {
      selectedSource.value = sources.value[0].id;
    }
  } catch (err) {
    console.error("Failed to fetch sources:", err);
    error.value = "获取数据源列表失败";
  }
};


// 刷新热榜数据
const refreshHotItems = async () => {
  await fetchHotItems();
};

// 初始化逻辑
onMounted(async () => {
  await fetchSources();
  await fetchHotItems();
});

watch(selectedSource, fetchHotItems);
</script>
