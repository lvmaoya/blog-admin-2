<script setup lang="ts">
import { Calendar, Home, Inbox, Command, Search, Settings } from "lucide-vue-next"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader
} from "@/components/ui/sidebar"
import NavUser from "./NavUser.vue"
import { useRouter } from "vue-router";
const data = {
    user: {
        name: 'lvmaoya',
        email: 'lvmaoyaz@gmail.com',
        avatar: 'http://lvmaoya.cn:8520/assets/cartoon.d6562f6b.jpg',
    },
}
// Menu items.
const groupList = [{
    group: "Getting Started",
    items: [
        {
            title: "Dashboard",
            url: "home"
        },
        {
            title: "Writing",
            url: "editArticle"
        },
    ],
},
{
    group: "Article",
    items: [
        {
            title: "Article List",
            url: "articleList"
        },
        {
            title: "Category",
            url: "articleCategory"
        },
        {
            title: "Comment",
            url: "articleComment"
        },
        {
            title: "Recycle Bin",
            url: "articleRecycleBin"
        },
        {
            title: "Temporary Storage",
            url: "articleTemporaryStorage"
        },
    ],
},
{
    group: "Todo",
    items: [
        {
            title: "Todo List",
            url: "todoList"
        },
        {
            title: "Statistic Data",
            url: "todoStatistic"
        }
    ],
},
{
    group: "File",
    items: [
        {
            title: "File Dashboard",
            url: "fileList"
        }
    ]
}
];
const router = useRouter();
const navigate = (url: string) => {
    router.push({ name: url });
}
</script>

<template>
    <Sidebar>
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <a href="#">
                            <div
                                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <Command class="size-4" />
                            </div>
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-semibold">Blog Admin</span>
                                <span class="truncate text-xs">2025-2-27</span>
                            </div>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup v-for="group in groupList" :key="group.group">
                <SidebarGroupLabel>{{ group.group }}</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="item in group.items" :key="item.title">
                            <SidebarMenuButton asChild @click="navigate(item.url)" class="cursor-pointer user-select-none">
                                <a>
                                    <span>{{ item.title }}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <NavUser :user="data.user" />
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>