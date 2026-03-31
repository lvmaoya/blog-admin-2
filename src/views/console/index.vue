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
import { onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const beforeUnloadHandler = (e) => {
  e = e || window.event;
  if (e) {
    e.returnValue = "关闭提示";
  }
  return "关闭提示";
};

watch(
  () => route.name,
  (name) => {
    if (name === "EditArticle") {
      window.onbeforeunload = beforeUnloadHandler;
    } else {
      window.onbeforeunload = null;
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  window.onbeforeunload = null;
});
</script>
