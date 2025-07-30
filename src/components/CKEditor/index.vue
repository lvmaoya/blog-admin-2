<template>
    <div class="ck-editor-wrapper editor-content ">
        <ckeditor v-model="content" :editor="ClassicEditor" :config="editorConfig" @ready="onReady" @focus="onFocus"
            @blur="onBlur" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
// 基础插件
import {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Underline,
    Link,
    BlockQuote,
    Heading,
    Table,
    TableToolbar,
    Undo,
    // 图片相关插件
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResize,
    ImageInsert,
    // 代码相关插件
    CodeBlock,
    // 上传插件
    Base64UploadAdapter,
    // 列表插件 - 移除了 TodoList
    List,
    ListProperties
} from 'ckeditor5'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import { BASE_API } from '@/service/common/axiosInstance'

// 导入 CSS
import 'ckeditor5/ckeditor5.css'
const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
    'ready': [editor: any]
}>()

const content = ref(props.modelValue)
const editorInstance = ref<any>(null)

// 编辑器配置
const editorConfig = computed(() => {
    return {
        licenseKey: 'GPL',
        // 在 plugins 数组中，确保图片相关插件都存在
        plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Link,
            BlockQuote,
            Heading,
            Table,
            TableToolbar,
            Undo,
            // 图片插件
            Image,
            ImageCaption,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            ImageResize,
            ImageInsert, // 确保这个插件存在
            // 代码插件
            CodeBlock,
            // 上传适配器
            Base64UploadAdapter,
            // 列表插件
            List,
            ListProperties
        ],
        toolbar: {
            items: [
                'undo', 'redo',
                '|',
                'heading',
                '|',
                'bold', 'italic', 'underline',
                '|',
                'link',
                '|',
                'bulletedList', 'numberedList',
                '|',
                'outdent', 'indent',
                '|',
                'blockQuote',
                '|',
                'insertTable',
                '|',
                'insertImage', // 确保图片插入按钮在这里
                '|',
                'codeBlock'
            ],
            shouldNotGroupWhenFull: true
        },
        // 图片配置
        image: {
            toolbar: [
                'imageStyle:inline',
                'imageStyle:wrapText',
                'imageStyle:breakText',
                '|',
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'imageResize:50',
                'imageResize:75',
                'imageResize:original'
            ],
            styles: {
                options: [
                    'inline',
                    'alignLeft',
                    'alignRight',
                    'alignCenter',
                    'alignBlockLeft',
                    'alignBlockRight',
                    'block',
                    'side'
                ]
            },
            resizeOptions: [
                {
                    name: 'imageResize:original',
                    label: 'Original size',
                    value: null,
                    icon: 'original'
                },
                {
                    name: 'imageResize:50',
                    label: '50%',
                    value: '50',
                    icon: 'medium'
                },
                {
                    name: 'imageResize:75',
                    label: '75%',
                    value: '75',
                    icon: 'large'
                }
            ],

        },

        // 列表配置
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true
            }
        },
        // 代码块配置
        codeBlock: {
            languages: [
                { language: 'plaintext', label: 'Plain text' },
                { language: 'javascript', label: 'JavaScript' },
                { language: 'typescript', label: 'TypeScript' },
                { language: 'html', label: 'HTML' },
                { language: 'css', label: 'CSS' },
                { language: 'php', label: 'PHP' },
                { language: 'python', label: 'Python' },
                { language: 'java', label: 'Java' },
                { language: 'c', label: 'C' },
                { language: 'cpp', label: 'C++' },
                { language: 'csharp', label: 'C#' },
                { language: 'sql', label: 'SQL' },
                { language: 'json', label: 'JSON' },
                { language: 'xml', label: 'XML' },
                { language: 'bash', label: 'Bash' }
            ]
        },
        // 表格配置
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
        // 标题配置
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                }
            ]
        }
    }
})

// 监听内容变化
watch(content, (newValue) => {
    emit('update:modelValue', newValue)
})

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
    if (newValue !== content.value) {
        content.value = newValue
    }
})

const onReady = (editor: any) => {
    editorInstance.value = editor
    emit('ready', editor)
}

const onFocus = () => {
    // 聚焦事件
}

const onBlur = () => {
    // 失焦事件
}

// 暴露编辑器实例方法
defineExpose({
    getEditor: () => editorInstance.value,
    setContent: (content: string) => {
        if (editorInstance.value) {
            editorInstance.value.setData(content)
        }
    },
    getContent: () => {
        return editorInstance.value ? editorInstance.value.getData() : ''
    },
    getContentTxt: () => {
        if (editorInstance.value) {
            const data = editorInstance.value.getData()
            return data.replace(/<[^>]*>/g, '')
        }
        return ''
    }
})
</script>

<style>
.editor-content {
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  line-height: 1.75;
  font-size: 1rem;
  max-width: 100%;
  word-wrap: break-word;
}

.editor-content h1,
.editor-content h2,
.editor-content h3,
.editor-content h4,
.editor-content h5,
.editor-content h6 {
  font-weight: 600;
  line-height: 1.25;
  color: #0f172a;
  margin: 2em 0 1em;
}

.editor-content h1 {
  font-size: 2.25rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.3em;
}

.editor-content h2 {
  font-size: 1.875rem;
  margin-top: 2em;
}

.editor-content h3 {
  font-size: 1.5rem;
}

.editor-content h4 {
  font-size: 1.25rem;
}

.editor-content p {
  margin: 1em 0;
  color: #334155;
}

.editor-content strong {
  font-weight: 600;
  color: #0f172a;
}

.editor-content em {
  font-style: italic;
}

.editor-content a {
  color: #2563eb;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.editor-content ul,
.editor-content ol {
  margin: 1em 0 1em 1.5em;
  padding-left: 1.5em;
}

.editor-content ul {
  list-style-type: disc;
}

.editor-content ol {
  list-style-type: decimal;
}

.editor-content li {
  margin: 0.5em 0;
}

.editor-content blockquote {
  margin: 1.5em 0;
  padding-left: 1rem;
  border-left: 4px solid #cbd5e1;
  color: #64748b;
  font-style: italic;
  background-color: #f8fafc;
}

.editor-content code {
  background-color: #f1f5f9;
  color: #0f172a;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95em;
}

.editor-content pre {
  background-color: #1e293b;
  color: #f8fafc;
  padding: 1em;
  border-radius: 8px;
  overflow: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  line-height: 1.6;
  margin: 1.5em 0;
}

.editor-content hr {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 2em 0;
}

.editor-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
}

.editor-content th,
.editor-content td {
  border: 1px solid #e2e8f0;
  padding: 0.75em;
  text-align: left;
}

.editor-content th {
  background-color: #f1f5f9;
  font-weight: 600;
}

.editor-content img {
  max-width: 100%;
  /* border-radius: 0.5rem; */
  margin: 1em 0;
  display: block;
}
.ck-sticky-panel__content {
  top: 64px !important;
  box-shadow: none !important;
  border: none !important;
  border-bottom: 1px solid #e2e8f0 !important;
}
.ck-editor-wrapper {
  --ck-icon-font-size: 0.54rem !important;
}
.ck-content {
    min-height: 100vh;
    border: none !important;
    box-shadow: none !important;
    /* border-top: 1px solid #e2e8f0 !important; */
}
</style>