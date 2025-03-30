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

const { value: categoryValue, handleChange } = useField('category')
const formSchema = toTypedSchema(z.object({
    title: z.string().min(1, 'Title cannot be empty!'),
    keywords: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    cover: z.any().optional()
}))
const files = ref([])
const loading = ref(false)
async function onSubmit(values) {
    loading.value = true
    let formData = { ...values }
    formData.category = categoryValue.value
    let res = await uploadFiles()
    formData.cover = res
    formData.content = prop.content
    console.log(formData);
    loading.value = false
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
    content: String
})
</script>

<template>
    <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
        <Dialog>
            <DialogTrigger as-child>
                <button class="submitBtn">Submit</button>
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
                    <FormField v-slot="{ componentField }" name="category">
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
                    <FormField v-slot="{ componentField }" name="cover">
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
                        Sumbit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </Form>
</template>

<style scoped lang="scss">
.submitBtn {
    padding: 0 var(--ck-spacing-medium);
    border-radius: var(--ck-border-radius);

    &:hover {
        background: var(--ck-color-list-button-hover-background);
    }
}
</style>