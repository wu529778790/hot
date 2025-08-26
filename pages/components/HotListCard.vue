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

          <!-- 复制卡片按钮 -->
          <button
            class="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-success/10"
            @click="copyCardToImage"
            :disabled="loading"
            :title="`复制 ${source.name} 卡片`">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
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
import html2canvas from "html2canvas";

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

// 创建自定义卡片图片（作为html2canvas的最终备选方案）
const createCustomCardImage = async (cardElement) => {
  return new Promise((resolve) => {
    const rect = cardElement.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // 设置canvas尺寸
    canvas.width = Math.max(400, rect.width * 2); // 最小宽度400px
    canvas.height = Math.max(300, rect.height * 2);
    ctx.scale(2, 2);

    const width = canvas.width / 2;
    const height = canvas.height / 2;

    // 绘制背景
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // 绘制边框
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);

    // 绘制标题区域
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, width, 80);

    // 绘制标题文字
    ctx.fillStyle = "#111827";
    ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
    ctx.fillText(props.source.name, 24, 32);

    // 绘制"实时更新"文字
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px system-ui, -apple-system, sans-serif";
    ctx.fillText("实时更新", 24, 52);

    // 绘制内容区域
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 80, width, height - 80);

    // 绘制示例内容
    ctx.fillStyle = "#374151";
    ctx.font = "14px system-ui, -apple-system, sans-serif";

    // 安全地访问items
    const items = (props.items || []).slice(0, 3);
    items.forEach((item, index) => {
      const y = 100 + index * 50;
      const title =
        item && item.title ? item.title.substring(0, 30) + "..." : "加载中...";
      ctx.fillText(`${index + 1}. ${title}`, 24, y);
    });

    resolve(canvas);
  });
};

// 创建简单的文本图片（最后的备选方案）
const createSimpleTextImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 600;
  canvas.height = 400;

  // 绘制背景
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 600, 400);

  // 绘制边框
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, 580, 380);

  // 绘制标题
  ctx.fillStyle = "#111827";
  ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
  ctx.fillText(props.source.name + " 热门内容", 30, 50);

  // 绘制时间
  ctx.fillStyle = "#6b7280";
  ctx.font = "16px system-ui, -apple-system, sans-serif";
  ctx.fillText("生成时间: " + new Date().toLocaleString(), 30, 80);

  // 绘制内容
  ctx.fillStyle = "#374151";
  ctx.font = "14px system-ui, -apple-system, sans-serif";

  props.items.slice(0, 8).forEach((item, index) => {
    const y = 120 + index * 30;
    const title =
      item.title.length > 40 ? item.title.substring(0, 40) + "..." : item.title;
    ctx.fillText(`${index + 1}. ${title}`, 30, y);
  });

  return canvas;
};

// 复制卡片为图片
const copyCardToImage = async () => {
  try {
    // 获取当前卡片元素
    const cardElement = document.getElementById(props.source.id);

    if (!cardElement) {
      throw new Error("未找到卡片元素");
    }

    // 配置 html2canvas 选项
    const options = {
      backgroundColor: "#ffffff", // 使用固定背景色避免颜色解析问题
      scale: 2, // 提高分辨率
      useCORS: true,
      allowTaint: true, // 允许使用外部资源和可能的问题样式
      logging: false,
      width: cardElement.scrollWidth,
      height: cardElement.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      ignoreElements: (element) => {
        // 忽略可能包含复杂颜色的元素
        return (
          element.classList.contains("backdrop-blur") ||
          element.classList.contains("bg-gradient-to-r")
        );
      },
    };

    // 生成 canvas
    let canvas;
    try {
      canvas = await html2canvas(cardElement, options);
    } catch (canvasError) {
      console.warn("html2canvas 失败，尝试降级方案:", canvasError);

      // 降级方案：使用更兼容的配置
      const fallbackOptions = {
        backgroundColor: "#ffffff",
        scale: 1, // 降低分辨率
        useCORS: false,
        allowTaint: true,
        logging: false,
        width: cardElement.scrollWidth,
        height: cardElement.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: () => true, // 忽略所有可能有问题的元素
      };

      try {
        canvas = await html2canvas(cardElement, fallbackOptions);
      } catch (fallbackError) {
        console.error("降级方案也失败，使用自定义方案:", fallbackError);

        // 最终备选方案：创建自定义canvas
        canvas = await createCustomCardImage(cardElement);

        if (!canvas) {
          // 如果自定义方案也失败，创建一个简单的文本图片
          canvas = createSimpleTextImage();
        }
      }
    }

    // 将 canvas 转换为 blob
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          throw new Error("图片生成失败");
        }

        try {
          // 创建 ClipboardItem
          const item = new ClipboardItem({ "image/png": blob });

          // 复制到剪贴板
          await navigator.clipboard.write([item]);

          // 显示成功提示
          if (window.$toast) {
            window.$toast.success(`${props.source.name} 卡片已复制到剪贴板`);
          } else {
            alert(`${props.source.name} 卡片已复制到剪贴板`);
          }
        } catch (clipboardError) {
          console.error("复制到剪贴板失败:", clipboardError);

          // 如果剪贴板API不可用，提供下载选项
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${props.source.name}-hot-list-${
            new Date().toISOString().split("T")[0]
          }.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          if (window.$toast) {
            window.$toast.info("图片已下载到本地");
          } else {
            alert("图片已下载到本地");
          }
        }
      },
      "image/png",
      0.9
    );
  } catch (error) {
    console.error("生成卡片图片失败:", error);

    if (window.$toast) {
      window.$toast.error("生成图片失败: " + error.message);
    } else {
      alert("生成图片失败: " + error.message);
    }
  }
};
</script>
