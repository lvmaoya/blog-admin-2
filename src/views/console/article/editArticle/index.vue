<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import SubmitForm from "./SubmitForm.vue";
import { computed, onMounted, ref, watch } from "vue";
import { articleDetailData } from "@/service/article";
import { BASE_API } from "@/service/common/axiosInstance";
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
  status: 1,
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
  configUrl: BASE_API + '/sys/ueditor',
  // 上传服务路径
  serverUrl: BASE_API + '/sys/ueditor',
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
  enableContextMenu: false,
  shortcutMenu: false,
  maxUndoCount: 100,
  toolbars: [
    [
      // "fullscreen",   // 全屏
      // "source",       // 源代码
      // "|",
      "undo",         // 撤销
      "redo",         // 重做
      "|",
      "bold",         // 加粗
      "italic",       // 斜体
      "underline",    // 下划线
      "fontborder",   // 字符边框
      "strikethrough",// 删除线
      "superscript",  // 上标
      "subscript",    // 下标
      "removeformat", // 清除格式
      "formatmatch",  // 格式刷
      "autotypeset",  // 自动排版
      "blockquote",   // 引用
      // "pasteplain",   // 纯文本粘贴模式
      "|",
      "forecolor",    // 字体颜色
      "backcolor",    // 背景色
      "insertorderedlist",   // 有序列表
      "insertunorderedlist", // 无序列表
      // "selectall",    // 全选
      // "cleardoc",     // 清空文档
      "|",
      "rowspacingtop",// 段前距
      "rowspacingbottom",    // 段后距
      "lineheight",          // 行间距
      "|",
      // "customstyle",         // 自定义标题
      "paragraph",           // 段落格式
      // "fontfamily",          // 字体
      "fontsize",            // 字号
      "|",
      // "directionalityltr",   // 从左向右输入
      // "directionalityrtl",   // 从右向左输入
      "indent",              // 首行缩进
      "|",
      "justifyleft",         // 居左对齐
      "justifycenter",       // 居中对齐
      "justifyright",
      "justifyjustify",      // 两端对齐
      // "|",
      // "touppercase",         // 字母大写
      // "tolowercase",         // 字母小写
      "|",
      "link",                // 超链接
      "unlink",              // 取消链接
      "anchor",              // 锚点
      "|",
      "imagenone",           // 图片默认
      "imageleft",           // 图片左浮动
      "imageright",          // 图片右浮动
      "imagecenter",         // 图片居中
      "|",
      "simpleupload",        // 单图上传
      "insertimage",         // 多图上传
      "emotion",             // 表情
      "scrawl",              // 涂鸦
      "insertvideo",         // 视频
      "attachment",          // 附件
      "insertframe",         // 插入Iframe
      "insertcode",          // 插入代码
      // "pagebreak",           // 分页
      // "template",            // 模板
      "background",          // 背景
      // "formula",             // 公式
      "|",
      "horizontal",          // 分隔线
      "date",                // 日期
      "time",                // 时间
      "spechars",            // 特殊字符
      // "wordimage",           // Word图片转存
      "|",
      "inserttable",         // 插入表格
      "deletetable",         // 删除表格
      "insertparagraphbeforetable",     // 表格前插入行
      "insertrow",           // 前插入行
      "deleterow",           // 删除行
      "insertcol",           // 前插入列
      "deletecol",           // 删除列
      "mergecells",          // 合并多个单元格
      // "mergeright",          // 右合并单元格
      // "mergedown",           // 下合并单元格
      "splittocells",        // 完全拆分单元格
      "splittorows",         // 拆分成行
      "splittocols",         // 拆分成列
      "contentimport",       // 内容导入（支持Word、Markdown）
      // "|",
      // "ai",                  // AI智能
      // "|",
      "print",               // 打印
      // "preview",             // 预览
      "searchreplace",       // 查询替换
      // "help",                // 帮助
    ]
  ],
}
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
  router.replace({ name: 'EditArticle' })
}
// 在 script setup 中添加 handleReset 函数
const handleReset = () => {
  // 重置编辑器内容
  if (editorInst.value) {
    editorInst.value.setContent('')
  }
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
    content: ''
  }
}
</script>

<template>
  <div v-loading="loading" :style="{ opacity: !loading ? 1 : 0, transition: 'opacity 0.3s' }">
    <vue-ueditor-wrap v-model="articleDetail.content" editor-id="editor" :config="editorConfig"
      :editorDependencies="['ueditor.config.js', 'ueditor.all.js']" style="height:100%" @ready="ready" />
  </div>
  <submit-form :article="articleDetail" :count="editorInst?.getContentTxt().length" @resetEditor="handleReset" />

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