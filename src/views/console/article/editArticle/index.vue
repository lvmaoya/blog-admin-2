<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->
<template>
  <div class="flex-1 overflow-hidden">
    <vue-ueditor-wrap v-model="content" editor-id="editor" :config="editorConfig"
      :editorDependencies="['ueditor.config.js', 'ueditor.all.js']" style="height:100%" @ready="ready"/>
    
  </div>
  <submit-form :content="content" :count="editorInst?.getContentTxt().length"/>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import SubmitForm from "./SubmitForm.vue";
import { computed, onMounted, ref } from "vue";
import { articleDetailData } from "@/service/article";
const route = useRoute()
const id = computed(() => route.query.id)
const editorInst = ref<any>(null)

const ready = (editorInstance: any) => {
   //获取编辑器实力
  editorInst.value = editorInstance
}

onMounted(() => {
  getArticle()
});
const getArticle = async () => {
  if (!id.value) return;
  const article = await articleDetailData(id.value)
  content.value = article.content
}
const content = ref("")
let editorConfig = {
  loadConfigFromServer: false,
  // 图片限制最大3M
  imageMaxSize: 3145728,
  // 富文本输入框宽度
  initialFrameWidth: '100%',

  // 获取上传配置路径
  configUrl: import.meta.env.VITE_API_URL + '/info/uEditor/config',
  // 上传服务路径
  serverUrl: import.meta.env.VITE_API_URL + '/info/uEditor/upload',
  // 必须配置域名,否则发版后获取不到页面资源
  UEDITOR_HOME_URL: location.origin + '/UEditorPlus/',
  UEDITOR_CORS_URL: location.origin + '/UEditorPlus/',
  // 配置请求头token
  serverHeaders: {
    'Authorization': `bearer `
  },
  // 上传图片配置
  imageConfig: {
    // 禁止在线管理
    disableOnline: true,
  }
}
</script>

<style scoped lang="scss">
:deep(#editor) {
  height: 100%;
  .edui-editor{
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 49 !important;
    #edui1_iframeholder{
      flex: 1;
    }
  }
}
</style>