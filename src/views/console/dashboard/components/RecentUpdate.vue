<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Article } from '..';
import EyeOpenIcon from '@radix-icons/vue/EyeOpenIcon'

const props = defineProps<{data: Array<Article>}>()
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center w-full" v-for="(item, index) in props.data" :key="index">
      <Avatar class="h-9 w-9">
        <AvatarFallback>{{ item.title.substr(0, 1) }}</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1 flex-1 w-0">
        <p class="text-sm font-medium leading-none">
          {{ item.title }}
        </p>
        <p class="text-sm text-muted-foreground maxline-1">
          {{ item.description }}
        </p>
      </div>
      <div class="ml-8 font-medium flex-shrink-0 flex items-center text-sm text-muted-foreground gap-2">
        <EyeOpenIcon class="h-4 w-4 text-muted-foreground" />
        {{ item.pageView }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.maxline-1 {
  white-space: nowrap; /* 禁止文本换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  max-width: 100%; /* 设置最大宽度 */
}
</style>