<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->

<script setup lang="ts">
import { useRoute } from "vue-router";
import SubmitForm from "./SubmitForm.vue";
import { computed, onMounted, ref, watch } from "vue";
import { articleDetailData } from "@/service/article";
import { BASE_URL } from "@/service/common/axiosInstance";
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
const id = computed(() => route.query.id)
const editorInst = ref<any>(null)

const ready = (editorInstance: any) => {
  //获取编辑器实力
  editorInst.value = editorInstance
}
console.log(localStorage.getItem('token'));
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
    status: 0,
    authorId: null,
    top: 0,
    content: ''
})
let editorConfig = {
  // 图片限制最大3M
  imageMaxSize: 3145728,
  // 富文本输入框高度
  initialFrameHeight: 1200,
  // 富文本输入框宽度
  initialFrameWidth: '100%',
  // 初始化样式 编辑区自定义样式，如果自定义，最好给 p 标签如下的行高，要不输入中文时，会有跳动感
  initialStyle: 'body p{line-height:1.8em; margin: 0 ;} h1,h2,h3,h4,blockquote{margin: 0 ;} body table{margin: 0 ;}',
  autoFloatEnabled: false,
  // 获取上传配置路径
  configUrl: BASE_URL + '/sys/ueditor',
  // 上传服务路径
  serverUrl: BASE_URL + '/sys/ueditor',
  // 必须配置域名,否则发版后获取不到页面资源
  UEDITOR_HOME_URL: location.origin + '/UEditorPlus/',
  // 配置请求头token
  serverHeaders: {
    'Authorization': localStorage.getItem('token'),
  },
  // 上传图片配置
  imageConfig: {
    // 禁止在线管理
    disableOnline: true,
  },
  toolbarShow: {
    // 这样就控制即使在 toolbars 中配置了该功能，也不显示
    "ai": false,
  },
  enableContextMenu: false,
  shortcutMenu: false,
}
const showDialog = ref(false)
const pendingId = ref<string | null>(null)

// 修改路由监听逻辑
watch(() => route.query.id, async (newId, oldId) => {
  if (newId === oldId) return
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
      content: ''
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
}
</script>

<template>
  <div v-loading="loading">
    <vue-ueditor-wrap v-model="articleDetail.content" editor-id="editor" :config="editorConfig"
      :editorDependencies="['ueditor.config.js', 'ueditor.all.js']" style="height:100%" @ready="ready" />
  </div>
  <submit-form :article="articleDetail" :count="editorInst?.getContentTxt().length" />

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

  // .edui-editor {
  //   height: 100%;
  //   display: flex;
  //   flex-direction: column;
  //   z-index: 49 !important;

    // #edui1_iframeholder {
    //   height: calc();
    // }
  // }
  .edui-editor{
    border: none;
  }
  .edui-editor-toolbarbox{
    position: sticky;
    top: 65px;
    z-index: 9999;
    background-color: white;
  }
}
</style>