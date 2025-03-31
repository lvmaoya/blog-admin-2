<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import type { Article } from '../data/schema'
import { Button } from '@/components/ui/button'
import { putTopArticle, deleteArticleData } from "@/service/article";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { labels } from '../data/data'
import { articleSchema } from '../data/schema'
import DotsHorizontalIcon from '@radix-icons/vue/DotsHorizontalIcon'
import { useEventBus } from '@vueuse/core'
import { toast } from '@/components/ui/toast';
const bus = useEventBus<string>('refresh-table')
interface DataTableRowActionsProps {
  row: Row<Article>
}
const props = defineProps<DataTableRowActionsProps>()

const row = computed(() => props.row.original)

const router = useRouter()

// 功能实现
const editArticle = () => {
  router.push({ name: 'editArticle', query: { id: row.value.id } })
}
const topLoading = ref(false)
const topArticle = async () => {
  try {
    topLoading.value = true
    await putTopArticle(row.value.id)
    bus.emit('refresh-table')
  } catch (error) {
    console.error(error)
  } finally {
    topLoading.value = false
  }
}

const shareArticle = () => {
  const shareUrl = `https://lvmaoya.cn/detail/${row.value.id}`
  navigator.clipboard.writeText(shareUrl).then(() => {
    toast({
      title: "🔗 文章链接复制成功！"
    })
  })
}

const previewArticle = () => {
  window.open(`https://lvmaoya.cn/detail/${row.value.id}`, '_blank')
}

const deleteArticle = async () => {
  await deleteArticleData(row.value.id)
  bus.emit('refresh-table')
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <DotsHorizontalIcon class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <!-- 编辑功能 -->
      <DropdownMenuItem @click="editArticle">Edit</DropdownMenuItem>
      <!-- 置顶功能 -->
      <DropdownMenuItem @click.stop="topArticle">
        {{ row.top ? 'Cancel Top' : 'Top' }}
        <DropdownMenuShortcut v-if="topLoading">Ing</DropdownMenuShortcut>
        <DropdownMenuShortcut v-else>🔝</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <!-- 分享功能 -->
      <DropdownMenuItem @click="shareArticle">
        Share
        <DropdownMenuShortcut>❤️</DropdownMenuShortcut>
      </DropdownMenuItem>
      <!-- 预览功能 -->
      <DropdownMenuItem @click="previewArticle">Preview</DropdownMenuItem>
      <DropdownMenuSeparator />
      <!-- 删除功能 -->
      <DropdownMenuItem @click="deleteArticle">
        Delete
        <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
