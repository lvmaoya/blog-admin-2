<template>
    <div class="ck-editor-wrapper editor-content markdown-body">
        <ckeditor v-model="content" :editor="BalloonEditor" :config="editorConfig" @ready="onReady" @focus="onFocus"
            @blur="onBlur" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
// 基础插件
import {
    BalloonEditor,
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
    // 移除 Base64UploadAdapter，使用自定义上传
    // 列表插件
    List,
    ListProperties
} from 'ckeditor5'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import { BASE_API } from '@/service/common/axiosInstance'
import axios from 'axios'

// 导入 CSS
import 'ckeditor5/ckeditor5.css'
import '@/assets/css/md.css'

// 自定义上传适配器
class CustomUploadAdapter {
    loader: any
    
    constructor(loader: any) {
        this.loader = loader
    }
    
    upload() {
        return this.loader.file.then((file: File) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData()
                formData.append('file', file)
                
                axios.post(`${BASE_API}/qiniu/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                }).then(response => {
                    if (response.data.code === 200) {
                        resolve({
                            default: response.data.data.url
                        })
                    } else {
                        reject(response.data.message || '上传失败')
                    }
                }).catch(error => {
                    reject(error.message || '上传失败')
                })
            })
        })
    }
    
    abort() {
        // 取消上传的逻辑
    }
}

// 上传适配器插件
function CustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new CustomUploadAdapter(loader)
    }
}

const props = defineProps<{
    modelValue: string
    placeholder?: string
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
        placeholder: props.placeholder || '请输入内容...',
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
            ImageInsert,
            // 代码插件
            CodeBlock,
            // 自定义上传适配器插件
            CustomUploadAdapterPlugin,
            // 列表插件
            List,
            ListProperties
        ],
        toolbar: {
            items: [
                'heading',
                'bold', 'italic', 'underline',
                'link',
                'bulletedList', 'numberedList',
                'outdent', 'indent',
                'blockQuote',
                'insertTable',
                'insertImage', // 确保图片插入按钮在这里
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
                    value: '75',
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

.ck-editor-wrapper {  
  display: flex;
  justify-content: center;
  margin-top: 20px !important;
}
.ck.ck-balloon-panel{
  --ck-drop-shadow: 0 2px 8px 0 rgba(68, 73, 77, 0.16) !important;
  border: none !important;
  border-radius: 4px !important;
}
.ck.ck-icon {
  font-size: 0.54rem !important;
}
.ck-content {
  min-height: calc(100vh - 104px);
  max-width: 1080px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 10px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px !important;
  border: none !important;
  padding: 60px !important;
  font-size: 14px;
  color: #1f2328;
  line-height: 2;
  word-break: break-word;
}
.ck-powered-by-balloon{
  display: none !important;
}
</style>