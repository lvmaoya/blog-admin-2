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

import { Loader2 } from 'lucide-vue-next'
import { ArrowUp } from 'lucide-vue-next'

import { Textarea } from '@/components/ui/textarea'

import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { onMounted, ref, watch } from 'vue'
import FileUpload from '@/components/upload/index.vue'
import CategorySelect from '@/components/category-select/index.vue'
import { useField } from 'vee-validate'
import { uploadFile } from '@/service/upload'
import { postArticle } from "@/service/article"
import type PostArticle from "./type.ts";


const files = ref([])
const initUrl = ref()
const loading = ref(false)
const dialogOpen = ref(false) // 控制 Dialog 的显示状态

const formData = ref({
    id: null,
    title: '',
    keywords: '',
    description: '',
    categoryValue: [null, null] as [number, number], // 替换原来的 categoryId 和 fatherCategoryId
    coverImage: null,
    content: '',
    charCount: 0,
})

async function onSubmit() {
    loading.value = true
    let submitData = { ...formData.value, fatherCategoryId: null, categoryId: null, charCount: props.count }
    console.log(formData.value.categoryValue);
    // 处理分类数据
    if (formData.value.categoryValue) {
        submitData.fatherCategoryId = formData.value.categoryValue[0]
        submitData.categoryId = formData.value.categoryValue[1]
    }
    delete submitData.categoryValue
    let res = await uploadFiles()
    submitData.coverImage = res
    await postArticle(submitData)
    loading.value = false
    toast({ title: submitData.id ? '文章更新成功' : '文章发布成功'  })
    dialogOpen.value = false
}

const handleError = (error: string) => {
    console.error('上传错误:', error)
}

// 上传文件的方法
const uploadFiles = async () => {       
    console.log(files.value);
    
    if (files.value.length === 0) {
        return
    }
    const formData = new FormData()
    files.value.forEach(file => {
        formData.append('file', file)
    })
    try {
        const response = await uploadFile(formData)
        console.log(response);
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

const props = defineProps<{ article: PostArticle, count: number }>()
watch(() => props.article, (newVal) => {
    console.log(newVal);
    if (props.article) {
        formData.value = {
            id: props.article.id,
            title: props.article.title,
            keywords: props.article.keywords,
            description: props.article.description,
            categoryValue: [props.article.fatherCategoryId, props.article.categoryId],
            content: props.article.content,
            charCount: props.count || props.article.charCount,
            coverImage: null
        }

        initUrl.value = props.article.coverImage
    }
    console.log(formData.value);
    
}, { deep: true })
</script>

<template>
    <Dialog v-model:open="dialogOpen">
        <DialogTrigger as-child>
            <Button class="submitBtn" size="icon" @click="dialogOpen = true">
                <ArrowUp class="w-4 h-4" />
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle>Article detail</DialogTitle>
                <DialogDescription>
                    Fill in article details here. Click submit when you're done.
                </DialogDescription>
            </DialogHeader>

            <form @submit.prevent="onSubmit">
                <div class="space-y-4">
                    <div>
                        <Label>Title</Label>
                        <Input v-model="formData.title" type="text" placeholder="title" />
                    </div>

                    <div>
                        <Label>Keywords</Label>
                        <Input v-model="formData.keywords" type="text" placeholder="keywords: aaa,bbb,ccc..." />
                    </div>

                    <div>
                        <Label>Category</Label>
                        <CategorySelect v-model="formData.categoryValue" />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Textarea v-model="formData.description" placeholder="fill in article description" />
                    </div>

                    <div>
                        <Label>Cover</Label>
                        <FileUpload v-model="files" :init-url="initUrl" accept="image/*,.pdf,.doc,.docx" :max-size="5"
                            :max-files="1" @error="handleError" />
                    </div>
                </div>

                <DialogFooter class="mt-4">
                    <Button type="button" variant="secondary">
                        Hold on
                    </Button>
                    <Button type="submit" :disabled="loading">
                        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                        Submit
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>

<style scoped lang="scss">
.submitBtn {
    position: fixed;
    right: 20px;
    bottom: 44px;
    z-index: 49;
    padding: 0 4px;
    border-radius: 50px;
}
</style>