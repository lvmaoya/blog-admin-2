<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="h-[100vh]">
      <header class="flex sticky top-0 bg-white h-16 shrink-0 items-center gap-2 border-b px-4 z-[50]">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <AppBreadcrumb />
      </header>
      <router-view v-slot="{ Component }">
        <KeepAlive exclude="EditArticle">
          <Component :is="Component" :key="route.name"></Component>
        </KeepAlive>
      </router-view>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup>
import AppSidebar from "./components/AppSidebar.vue";
import AppBreadcrumb from "./components/AppBreadcrumb.vue";
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import homeIcon from "@/assets/icon/tab/home.svg";
import todoIcon from "@/assets/icon/tab/todo.svg";
import articleIcon from "@/assets/icon/tab/article.svg";
import fileIcon from "@/assets/icon/tab/file.svg";
import activeHomeIcon from "@/assets/icon/tab-active/home.svg";
import activeTodoIcon from "@/assets/icon/tab-active/todo.svg";
import activeArticleIcon from "@/assets/icon/tab-active/article.svg";
import activeFileIcon from "@/assets/icon/tab-active/file.svg";
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-vue-next'

import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { logout } from "@/service/login";
import { deleteCache } from "@/utils/cache";
const router = useRouter();
const route = useRoute();


const menuList = ref([
  {
    iconPath: homeIcon,
    activeIconPath: activeHomeIcon,
    index: 0,
    url: '/console/dashboard',
    active: true
  },
  {
    iconPath: articleIcon,
    activeIconPath: activeArticleIcon,
    index: 1,
    url: '/console/article/list',
    active: false
  },
  {
    iconPath: todoIcon,
    activeIconPath: activeTodoIcon,
    index: 2,
    url: '/console/todo',
    active: false
  },
  {
    iconPath: fileIcon,
    activeIconPath: activeFileIcon,
    index: 3,
    url: '/console/file',
    active: false
  },
])

const setActive = (index) => {
  let activeIndex = menuList.value.find(item => item.active)?.index
  if (activeIndex != index) {
    menuList.value.forEach(item => item.active = false)
    menuList.value[index].active = true
    router.push(menuList.value[index].url);
  }
}
const handleAddClick = () => {
  router.push("/console/article/edit");
  menuList.value.forEach(item => item.active = false)
  // menuList.value[].active = true
}
const handleLogoClick = () => {
  router.push("/console/dashboard");
  menuList.value.forEach(item => item.active = false)
  menuList.value[0].active = true
}

// Watch for route changes to update activeIndex
watch(route, (newRoute) => {
  const currentPath = newRoute.path;
  const activeItem = menuList.value.find(item => currentPath.startsWith(item.url));
  if (activeItem) {
    menuList.value.forEach(item => item.active = false)
    menuList.value[activeItem.index].active = true
  }
}, { immediate: true });
const handleLogoutClick = async () => {
  await logout();
  deleteCache("token")
  router.push("/login");
}
window.onbeforeunload = (e) => {
  if (route.path == "/console/article/editArticle") {
    e = e || window.event;
    // 兼容IE8和Firefox 4之前的版本
    if (e) {
      e.returnValue = "关闭提示";
    }
    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    return "关闭提示";
  } else {
    window.onbeforeunload = null;
  }
};

</script>

<style scoped lang="scss">
.common-layout {
  width: 100%;
  height: 100%;
  display: flex;

  .aside {
    width: 70px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    .logo {
      position: absolute;
      top: 0px;
      height: 10%;
      width: 100%;
      max-height: 90px;
      padding-top: 12px;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 20px;
        font-weight: 600;
        display: block;
        user-select: none;
      }
    }

    ul {
      width: 100%;
      position: relative;

      li {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        cursor: pointer;
        transition: all 0.3s;


        &:active {
          transform: scale(0.95);
        }
      }

      .active {
        transform: scale(1.1);
      }


      .add-btn {
        box-shadow: 0 6px 16px rgba(130, 203, 235, 0.5);
        background-color: #68d0fd;
        width: 40px;
        height: 40px;
        line-height: 40px;
        color: white;
        border-radius: 50%;
        font-size: 30px;
        font-weight: 300;
        position: absolute;
        top: -100px;
        left: 0;
        right: 0;
        margin: 0 auto;
      }

      .icon {
        width: 18px;
        height: 18px;
      }
    }

    .logout {
      position: absolute;
      bottom: 0px;
      height: 10%;
      width: 100%;
      max-height: 90px;
      padding-bottom: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .console {
    flex: 1;
    // border-radius: 24px 0 0 24px;
    overflow: hidden;
    position: relative;
  }
}
</style>
