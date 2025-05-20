<script setup lang="ts">
import { Calendar, Home, Inbox, Command, Search, Settings, Pencil, LibraryBig, ChartBarStacked, MessageSquareText, CalendarCheck, AlarmClockCheck, Paperclip } from "lucide-vue-next"
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
import { useArticleStore } from '@/stores/article'
//@ts-ignore
import PackageJson from '../../../../package.json'

const articleStore = useArticleStore()

const version = "v - " + PackageJson.version


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
            url: "Dashboard",
            icon: Home,
        },
        {
            title: "Writing",
            url: "EditArticle",
            icon: Pencil,
        },
    ],
},
{
    group: "Article",
    items: [
        {
            title: "Article List",
            url: "ArticleList",
            icon: LibraryBig,
        },
        {
            title: "Category",
            url: "ArticleCategory",
            icon: ChartBarStacked,
        },
        {
            title: "Comment",
            url: "ArticleComment",
            icon: MessageSquareText,
        },
    ],
},
{
    group: "Todo",
    items: [
        {
            title: "Todo List",
            url: "TodoList",
            icon: CalendarCheck,
        },
        {
            title: "Statistic Data",
            url: "TodoStatistic",
            icon: AlarmClockCheck,
        }
    ],
},
{
    group: "File",
    items: [
        {
            title: "File Dashboard",
            url: "FileList",
            icon: Paperclip,
        }
    ]
}
];
const router = useRouter();
const navigate = (url: string) => {
    if (url === 'EditArticle' && articleStore.currentEditId) {
        router.push({ name: url, query: { id: articleStore.currentEditId } });
        return;
    }
    router.push({ name: url });
}
const isActive = (url: string) => {
    return router.currentRoute.value.name === url;
}
</script>

<template>
    <Sidebar>
        <SidebarHeader class="px-3 py-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <a href="#">
                            <div class="flex aspect-square size-6 items-center justify-center rounded-lg">
                                <img src="https://lvmaoya.cn/favicon.ico" alt="logo" />
                            </div>
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-semibold">Blog Admin</span>
                                <span class="truncate text-xs">{{ version }}</span>
                            </div>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup v-for="group in groupList" :key="group.group" class="px-3 py-2">
                <SidebarGroupLabel>
                    <h2>{{ group.group }}</h2>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="item in group.items" :key="item.title">
                            <SidebarMenuButton asChild @click="navigate(item.url)"
                                class="cursor-pointer user-select-none h-9 px-4" :class="{'active': isActive(item.url)}">
                                <a>
                                    <component :is="item.icon" class="mr-1 " />
                                    <span class="text-[#09090B]">{{ item.title }}</span>
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
<style lang="scss" scoped>
.active {
    background-color: hsl(var(--sidebar-accent));
    color: #000000;
}
</style>