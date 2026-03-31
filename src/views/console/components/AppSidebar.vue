<script setup lang="ts">
import { Home, Pencil, LibraryBig, ChartBarStacked, MessageSquareText, LogOut, Loader2 } from "lucide-vue-next"
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
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useMediaQuery } from '@vueuse/core'
import { useRouter } from "vue-router";
import { useArticleStore } from '@/stores/article'
import { useToast } from '@/components/ui/toast/use-toast'
import { logout } from '@/service/login'
import { deleteCache } from '@/utils/cache'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
//@ts-ignore
import PackageJson from '../../../../package.json'

const articleStore = useArticleStore()
const { toast } = useToast()
const loading = ref(false)
const logoutDialogVisible = ref(false)
const isSmallDevice = useMediaQuery('(max-width: 1024px)')

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

const handleLogout = async () => {
    try {
        loading.value = true
        await logout()
        deleteCache('token')
        toast({
            title: 'Uh! Logout Success!',
            description: 'You have successfully logged out.',
        })
        router.replace({
            path: "/login",
        })
    } catch (error: any) {
        toast({
            title: 'Uh oh! Something went wrong.',
            description: error?.response?.data || 'Logout failed. Please try again.',
            variant: 'destructive',
        })
        console.error(error)
    } finally {
        loading.value = false
        logoutDialogVisible.value = false
    }
}
</script>

<template>
    <Sidebar :variant="isSmallDevice ? 'floating' : 'sidebar'">
        <SidebarHeader class="px-3 py-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <a href="https://lvmaoya.cn" target="_blank">
                            <div class="flex aspect-square size-6 items-center justify-center rounded-lg">
                                <img src="https://lvmaoya.cn/favicon.ico" alt="logo" />
                            </div>
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-semibold">Blog Admin</span>
                                <!-- <span class="truncate text-xs">{{ version }}</span> -->
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
                                class="nav-item-btn cursor-pointer user-select-none h-9 px-4" :class="{'active': isActive(item.url)}">
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
            <AlertDialog :open="logoutDialogVisible">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                            :disabled="loading"
                            @click="logoutDialogVisible = true"
                        >
                            <Avatar class="h-8 w-8 rounded-lg">
                                <AvatarImage :src="data.user.avatar" :alt="data.user.name" />
                                <AvatarFallback class="rounded-lg">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-semibold">{{ data.user.name }}</span>
                                <span class="truncate text-xs">{{ data.user.email }}</span>
                            </div>
                            <Loader2 v-if="loading" class="ml-auto size-4 animate-spin" />
                            <LogOut v-else class="ml-auto size-4" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will log you out of your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel @click="logoutDialogVisible = false">Cancel</AlertDialogCancel>
                        <Button @click="handleLogout" :disabled="loading">
                            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>
<style lang="scss" scoped>
.active {
    background-color: hsl(var(--sidebar-accent));
    color: #000000;
}

.nav-item-btn:hover:not(.active) {
    background-color: transparent;
    color: inherit;
}
</style>
