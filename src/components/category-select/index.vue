<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { onMounted, PropType, ref, watch } from 'vue'
import { categoryListData } from '@/service/category'

interface Category {
    id: number
    categoryName: string
    fatherCategoryId: number
    // 可以根据实际接口返回的字段进行调整
}

const props = defineProps({
    modelValue: {
        type: Array, // [fatherCategoryId, categoryId]
        default: () => [null, null]
    },
    placeholder: {
        type: String,
        default: 'select article category'
    }
})

const emit = defineEmits(['update:modelValue'])

const categories = ref<Category[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

// 获取分类数据
const fetchCategories = async () => {
    try {
        isLoading.value = true
        error.value = null

        // 这里使用实际的API调用方法，示例使用fetch
        const response = await categoryListData()
        if (!response) {
            throw new Error('获取分类失败')
        }
        categories.value = response // 假设返回的是分类数组
    } catch (err) {
        error.value = err instanceof Error ? err.message : '获取分类时出错'
        console.error('获取分类错误:', err)
    } finally {
        isLoading.value = false
    }
}

// 组件挂载时获取分类
onMounted(() => {
    fetchCategories()
})

// 处理选择变化
const handleValueChange = (value: number) => {
    console.log(value);
    const selected = categories.value.find(item => item.id === value)
    if (selected) {
        console.log([selected.fatherCategoryId, selected.id]);
        selectedValue.value = selected.id
        emit('update:modelValue', [selected.fatherCategoryId, selected.id])
    }
}

// 获取当前选中的分类名称
const selectedValue = ref(props.modelValue[1])
</script>

<template>
    <Select :modelValue="selectedValue" @update:modelValue="handleValueChange">
        <SelectTrigger>
            <SelectValue :placeholder="placeholder" />
        </SelectTrigger>

        <SelectContent class="SelectContent">
            <SelectGroup>
                <!-- 加载状态 -->
                <div v-if="isLoading" class="py-2 text-center text-sm text-muted-foreground">
                    加载中...
                </div>

                <!-- 错误状态 -->
                <div v-if="error" class="py-2 text-center text-sm text-destructive">
                    {{ error }}
                </div>

                <!-- 空状态 -->
                <div v-if="!isLoading && !error && categories.length === 0"
                    class="py-2 text-center text-sm text-muted-foreground">
                    暂无分类
                </div>

                <!-- 正常状态 -->
                <SelectItem v-for="category in categories" :key="category.id" :value="category.id" :disabled="category.categoryName == 'Work'">
                    {{ category.fatherCategoryId == 2 && category.id != 2 ? '学习输出--' : '' }}{{ category.categoryName }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>

<style scoped></style>