<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { addOrUpdateCategory } from "@/service/category";

import { useEventBus } from '@vueuse/core'
const bus = useEventBus<string>('refresh-table')
const { toast } = useToast()
const categoryName = ref('')
const isLoading = ref(false)
const isOpen = ref(false)

const submitCategory = async () => {
    if (!categoryName.value.trim()) {
        toast({
            title: 'Error',
            description: 'Category name cannot be empty',
            variant: 'destructive'
        })
        return
    }

    if (categoryName.value.length > 50) {
        toast({
            title: 'Error',
            description: 'Category name must be less than 50 characters',
            variant: 'destructive'
        })
        return
    }

    try {
        isLoading.value = true

        // 这里替换为实际的API调用
        await addOrUpdateCategory({ categoryName: categoryName.value.trim() })
        bus.emit("refresh-table")
        toast({
            title: 'Success',
            description: 'Category added successfully'
        })

        // 重置表单并关闭对话框
        categoryName.value = ''
        isOpen.value = false
    } catch (error) {
        toast({
            title: 'Error',
            description: 'Failed to add category',
            variant: 'destructive'
        })
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger as-child>
            <Button variant="outline" size="sm" class="ml-auto h-8 lg:flex ml-2">
                <Plus class="mr-2 h-4 w-4" />
                Add Category
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                    Currently, only the article categories for learning records can be added.
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="categoryName" class="text-right">
                        Category Name
                    </Label>
                    <Input id="categoryName" v-model="categoryName" placeholder="Enter category name" class="col-span-3"
                        :disabled="isLoading" @keyup.enter="submitCategory" />
                </div>
            </div>
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="outline" :disabled="isLoading">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" @click="submitCategory" :disabled="isLoading || !categoryName.trim()">
                    <span v-if="isLoading" class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        Saving...
                    </span>
                    <span v-else>Save Category</span>
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>