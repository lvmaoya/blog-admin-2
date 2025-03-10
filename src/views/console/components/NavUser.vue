<script setup lang="ts">
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
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
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Settings,
    Sparkles,
    User,
} from 'lucide-vue-next'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { logout } from '@/service/login'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter, useRoute } from "vue-router";
import {deleteCache} from '@/utils/cache';

const { toast } = useToast()
const router = useRouter();

const props = defineProps<{
    user: {
        name: string
        email: string
        avatar: string
    }
}>()
const { isMobile } = useSidebar()
const wait = () => new Promise(resolve => setTimeout(resolve, 1000))
const open = ref(false)
const handleAction = async () => {
    try {
        loading.value = true
        await logout()
        router.replace({
            path: "/login",
        });
        deleteCache('token');
        toast({
            title: 'Uh! Logout Success!',
            description: 'Welcome back! You have successfully logged into your account.',
        });
    } catch (error) {
        toast({
            title: 'Uh oh! Something went wrong.',
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
                                    CN
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
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <CreditCard />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Settings />
                            Setting
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem @click="logoutDialogVisible = true">
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will log you out of your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel @click="logoutDialogVisible = false">Cancel</AlertDialogCancel>
                        <Button @click="handleAction" :disabled="loading">
                            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
