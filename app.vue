<template>
  <div
    class="min-h-screen bg-gradient-to-br from-base-100 via-base-50 to-base-100 dark:from-base-200 dark:via-base-300 dark:to-base-200">
    <!-- 导航栏 -->
    <nav
      class="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300/50 sticky top-0 z-40 shadow-sm">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/">首页</a></li>
            <li><a href="#about">关于</a></li>
            <li><a href="#stats">统计</a></li>
          </ul>
        </div>
      </div>

      <div class="navbar-center">
        <div class="flex items-center space-x-2">
          <div
            class="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-md flex items-center justify-center">
            <svg
              class="w-4 h-4 text-primary-content"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <span
            class="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            热榜聚合
          </span>
        </div>
      </div>

      <div class="navbar-end">
        <div class="flex items-center space-x-2">
          <!-- 搜索 -->
          <div class="form-control hidden sm:flex">
            <input
              type="text"
              placeholder="搜索热榜..."
              class="input input-bordered input-sm w-48" />
          </div>

          <!-- 主题切换器 -->
          <button
            @click="toggleTheme"
            class="btn btn-ghost btn-circle"
            :title="
              currentTheme === 'light' ? '切换到深色模式' : '切换到浅色模式'
            ">
            <svg
              v-if="currentTheme === 'light'"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <!-- 用户菜单 -->
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div
                class="w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-primary-content"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd" />
                </svg>
              </div>
            </label>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>设置</a></li>
              <li><a>关于</a></li>
              <li><a>反馈</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="relative">
      <NuxtPage />
    </main>

    <!-- 底部区域 -->
    <footer
      class="bg-base-100/80 backdrop-blur-md border-t border-base-300/50 mt-16">
      <div class="container mx-auto px-6 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- 品牌区域 -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
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
              <span class="font-bold text-lg">热榜聚合</span>
            </div>
            <p class="text-base-content/70 mb-4">
              聚合各大平台的热门内容，为您提供最及时、最全面的资讯浏览体验。
            </p>
            <div class="flex space-x-4">
              <a
                href="#"
                class="text-base-content/60 hover:text-primary transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                class="text-base-content/60 hover:text-primary transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                class="text-base-content/60 hover:text-primary transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.75.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
            </div>
          </div>

          <!-- 链接区域 -->
          <div>
            <h4 class="font-semibold mb-4">功能</h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  class="text-base-content/70 hover:text-primary transition-colors"
                  >实时热榜</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-base-content/70 hover:text-primary transition-colors"
                  >数据统计</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-base-content/70 hover:text-primary transition-colors"
                  >订阅通知</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-base-content/70 hover:text-primary transition-colors"
                  >API文档</a
                >
              </li>
            </ul>
          </div>

          <!-- 资源区域 -->
          <div>
            <h4 class="font-semibold mb-4">资源</h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  class="text-base-content/70 hover:text-primary transition-colors"
                  >帮助中心</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-base-content/70 hover:text-primary transition-colors"
                  >隐私政策</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-base-content/70 hover:text-primary transition-colors"
                  >使用条款</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-base-content/70 hover:text-primary transition-colors"
                  >联系我们</a
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- 版权信息 -->
        <div class="border-t border-base-300/50 mt-8 pt-6 text-center">
          <p class="text-base-content/60 text-sm">
            © 2024 热榜聚合 - 打造更好的资讯浏览体验
          </p>
          <div
            class="flex justify-center space-x-4 mt-2 text-xs text-base-content/50">
            <span>数据来源：各大公开平台</span>
            <span>•</span>
            <span>更新频率：实时</span>
            <span>•</span>
            <span>版本：{{ version }}</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- 回到顶部按钮 -->
    <button
      @click="scrollToTop"
      class="fixed bottom-6 right-6 btn btn-circle btn-primary shadow-lg opacity-0 transition-opacity duration-300"
      :class="{ 'opacity-100': showScrollTop }"
      id="scrollToTopBtn">
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </div>
</template>

<script setup>
// 版本信息
const version = "1.0.0";

// 主题管理
const currentTheme = ref("light");

const toggleTheme = () => {
  const newTheme = currentTheme.value === "light" ? "dark" : "light";
  currentTheme.value = newTheme;
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

// 初始化主题
onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  currentTheme.value = savedTheme;
  document.documentElement.setAttribute("data-theme", savedTheme);
});

// 回到顶部功能
const showScrollTop = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  const toggleScrollTop = () => {
    showScrollTop.value = window.scrollY > 300;
  };

  window.addEventListener("scroll", toggleScrollTop);
  toggleScrollTop(); // 初始化检查

  onUnmounted(() => {
    window.removeEventListener("scroll", toggleScrollTop);
  });
});
</script>

<style scoped>
/* 自定义滚动条样式 */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgb(203 213 225 / 0.3);
  border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgb(203 213 225 / 0.5);
}
</style>
