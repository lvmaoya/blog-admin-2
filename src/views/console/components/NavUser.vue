<script setup lang="ts">
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar'
import {
    ChevronsUpDown,
    LogOut,
} from 'lucide-vue-next'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { logout } from '@/service/login'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from "vue-router";
import { deleteCache } from '@/utils/cache';

const { toast } = useToast()
const router = useRouter();

defineProps<{
    user: {
        name: string
        email: string
        avatar: string
    }
}>()
const { isMobile } = useSidebar()
const handleAction = async () => {
    try {
        loading.value = true
        await logout()
        router.replace({
            path: "/login",
        });
        deleteCache('token');
        toast({
            title: '退出成功',
            description: '你已成功退出登录。',
        });
    } catch (error) {
        toast({
            title: '退出失败',
            description: error.response.data,
            variant: 'destructive',
        });
        console.error(error);
    } finally {
        loading.value = false;
        logoutDialogVisible.value = false;
    }
}
const loading = ref(false)
const logoutDialogVisible = ref(false)
</script>
<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <AlertDialog :open="logoutDialogVisible">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <SidebarMenuButton size="lg"
                            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar class="h-8 w-8 rounded-lg">
                                <AvatarImage :src="user.avatar" :alt="user.name" />
                                <AvatarFallback class="rounded-lg">
                                    LV
                                </AvatarFallback>
                            </Avatar>
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-semibold">{{ user.name }}</span>
                                <span class="truncate text-xs">{{ user.email }}</span>
                            </div>
                            <ChevronsUpDown class="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        :side="isMobile ? 'bottom' : 'right'" align="end" :side-offset="4">
                        <DropdownMenuLabel class="p-0 font-normal">
                            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar class="h-8 w-8 rounded-lg">
                                    <AvatarImage :src="user.avatar" :alt="user.name" />
                                    <AvatarFallback class="rounded-lg">
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <div class="grid flex-1 text-left text-sm leading-tight">
                                    <span class="truncate font-semibold">{{ user.name }}</span>
                                    <span class="truncate text-xs">{{ user.email }}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem @click="logoutDialogVisible = true">
                            <LogOut />
                            退出登录
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>确认退出登录？</AlertDialogTitle>
                        <AlertDialogDescription>
                            退出后需要重新登录才能继续操作。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel @click="logoutDialogVisible = false">取消</AlertDialogCancel>
                        <Button @click="handleAction" :disabled="loading">
                            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                            确认
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
