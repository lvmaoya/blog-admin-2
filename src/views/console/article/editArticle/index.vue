<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import SubmitForm from "./SubmitForm.vue";
import CKEditor from "@/components/CKEditor/index.vue"
import { computed, onMounted, ref, watch } from "vue";
import { articleDetailData } from "@/service/article";
import type PostArticle from "./type.ts";
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
} from "@/components/ui/alert-dialog"


const route = useRoute()
const router = useRouter()
const id = computed(() => route.query.id)

const loading = ref(false)
const getArticle = async () => {
  loading.value = true
  if (!id.value) return;
  const article = await articleDetailData(id.value)
  articleDetail.value = article
  loading.value = false
}
const articleDetail = ref<PostArticle>({
  id: null,
  title: '',
  description: '',
  keywords: '',
  categoryId: null,
  charCount: 0,
  fatherCategoryId: null,
  coverImage: '',
  status: 1,
  authorId: null,
  top: 0,
  content: '',
  keepDesc: false
})

const showDialog = ref(false)
const pendingId = ref<string | null>(null)

// 修改路由监听逻辑
watch(() => route.query.id, async (newId, oldId) => {
  if (!newId) {
    return;
  }
  if(!articleDetail.value.content){
    getArticle()
    return
  }
  if (newId === oldId) {
    return
  }
  pendingId.value = newId as string
  showDialog.value = true
}, { immediate: true })

const handleIdChange = (newId: string) => {
  if (newId) {
    getArticle()
  } else {
    articleDetail.value = {
      id: null,
      title: '',
      description: '',
      keywords: '',
      categoryId: null,
      charCount: 0,
      fatherCategoryId: null,
      coverImage: '',
      status: 0,
      authorId: null,
      top: 0,
      content: '',
      keepDesc: false
    }
  }
}

const handleConfirm = () => {
  handleIdChange(pendingId.value!)
  showDialog.value = false
}

const handleCancel = () => {
  showDialog.value = false
  pendingId.value = null
  router.replace({ name: 'EditArticle' })
}
const handleReset = () => {
  // 重置文章详情
  articleDetail.value = {
    id: null,
    title: '',
    description: '',
    keywords: '',
    categoryId: null,
    charCount: 0,
    fatherCategoryId: null,
    coverImage: '',
    status: 1,
    authorId: null,
    top: 0,
    content: '',
    keepDesc: false
  }
}
</script>

<template>
  <div v-loading="loading">
    <CKEditor 
      v-model="articleDetail.content"
    />
  </div>
  <submit-form :article="articleDetail" @resetEditor="handleReset" />

  <AlertDialog :open="showDialog">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>确认放弃更改？</AlertDialogTitle>
        <AlertDialogDescription>
          当前文章未保存，切换将丢失所有更改。
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="handleCancel">取消</AlertDialogCancel>
        <AlertDialogAction @click="handleConfirm">确认</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style scoped lang="scss">
:deep(#editor) {
  // height: 100%;

  .edui-editor {
    z-index: 49 !important;
  }

  .edui-editor {
    border: none;
  }

  .edui-editor-toolbarbox {
    position: sticky;
    top: 64px;
    z-index: 9999;
    background-color: white;
  }
}
</style>