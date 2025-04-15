<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Loader2 } from 'lucide-vue-next'

import { Textarea } from '@/components/ui/textarea'

import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { toTypedSchema } from '@vee-validate/zod'
import { h, ref } from 'vue'
import * as z from 'zod'
import FileUpload from '@/components/upload/index.vue'
import CategorySelect from '@/components/category-select/index.vue'
import { useField } from 'vee-validate'
import { uploadFile } from '@/service/upload'
import { postArticle } from "@/service/article"

const { value: categoryValue, handleChange } = useField('categoryValue')
const formSchema = toTypedSchema(z.object({
    title: z.string().min(1, 'Title cannot be empty!'),
    keywords: z.string().optional(),
    categoryValue: z.string().optional(),
    description: z.string().optional(),
    coverImage: z.any().optional()
}))

const files = ref([])
const loading = ref(false)
const dialogOpen = ref(false) // 控制 Dialog 的显示状态

async function onSubmit(values) {
    loading.value = true
    let formData = { ...values }
    delete formData.categoryValue
    if (categoryValue.value) {
        formData.fatherCategoryId = categoryValue.value[0]
        formData.categoryId = categoryValue.value[1]
    }
    let res = await uploadFiles()
    formData.coverImage = res
    formData.content = prop.content
    formData.charCount = prop.count
    await postArticle(formData)
    loading.value = false

    toast({
        title: '文章上传成功'
    });

    dialogOpen.value = false // 隐藏弹窗
}

const handleError = (error: string) => {
    console.error('上传错误:', error)
}

// 上传文件的方法
const uploadFiles = async () => {
    if (files.value.length === 0) {
        return
    }
    const formData = new FormData()
    files.value.forEach(file => {
        formData.append('file', file)
    })
    try {
        const response = await uploadFile(formData)
        toast({
            title: '图片上传成功'
        });
        return response.url
    } catch (error) {
        console.error('上传出错:', error)
        toast({
            title: '上传出错',
            variant: 'destructive',
        });
    }
}

const prop = defineProps({
    content: String,
    count: Number,
})
</script>

<template>
    <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
        <Dialog v-model:open="dialogOpen">
            <DialogTrigger as-child>
                <button class="submitBtn" @click="dialogOpen = true">submit</button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Article detail</DialogTitle>
                    <DialogDescription>
                        Fill in article details here. Click submit when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
                    <FormField v-slot="{ componentField }" name="title">
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="title" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <div class="h-4"></div>
                    <FormField v-slot="{ componentField }" name="keywords">
                        <FormItem>
                            <FormLabel>Keywords</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="keywords: aaa,bbb,ccc..." v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <div class="h-4"></div>
                    <FormField v-slot="{ componentField }" name="categoryValue">
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <CategorySelect :modelValue="categoryValue" @update:modelValue="handleChange" />
                            </FormControl>
                        </FormItem>
                    </FormField>
                    <div class="h-4"></div>
                    <FormField v-slot="{ componentField }" name="description">
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea v-bind="componentField" placeholder="fill in article description" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <div class="h-4"></div>
                    <FormField v-slot="{ componentField }" name="coverImage">
                        <FormItem>
                            <FormLabel>Cover</FormLabel>
                            <FormControl>
                                <FileUpload v-model="files" accept="image/*,.pdf,.doc,.docx" :max-size="5"
                                    :max-files="1" @error="handleError" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </form>

                <DialogFooter>
                    <Button type="submit" form="dialogForm" variant="secondary">
                        Hold on
                    </Button>
                    <Button type="submit" form="dialogForm" :disabled="loading">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="loading" />
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </Form>
</template>

<style scoped lang="scss">
.submitBtn {
    position: fixed;
    right: 0;
    bottom: 24px;
    z-index: 49;
    padding: 0 4px;
    border-radius: 4px;
    color: #ccc;
    &:hover {
        background: #f2f2f2;
    }
}
</style>