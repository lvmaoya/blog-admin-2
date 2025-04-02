<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->
<template>
  <div class="flex-1 overflow-hidden">
    <div class="main-container prose max-w-full !h-full">
      <div
        class="editor-container editor-container_document-editor editor-container_include-style editor-container_include-word-count"
        ref="editorContainerElement">
        <div class="relative">
          <div class="editor-container__menu-bar" ref="editorMenuBarElement"></div>
          <div class="absolute top-0 bottom-0 right-4 text-[13px] btn-wrapper" v-if="cloud.data">
            <SubmitForm :content="content"></SubmitForm>
          </div>
        </div>
        <div class="editor-container__toolbar" ref="editorToolbarElement"></div>
        <div class="editor-container__editor-wrapper">
          <div class="editor-container__editor">
            <div ref="editorElement">
              <ckeditor v-if="editor && config" :editor="editor" :config="config" @ready="onReady" v-model="content" />
            </div>
          </div>
        </div>
        <div class="editor_container__word-count" ref="editorWordCountElement"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "./assets/style.css"
import { computed, ref, onMounted, useTemplateRef } from 'vue';
import { Ckeditor, useCKEditorCloud } from '@ckeditor/ckeditor5-vue';
import SubmitForm from "./SubmitForm.vue";
import { articleDetailData } from "@/service/article";
import { useRoute, useRouter } from "vue-router";
const LICENSE_KEY = ''
  // 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzA5NDA3OTksImp0aSI6IjJmYTM3ODg5LWUyNDAtNGViYi1hNzNlLTg4YWFlMDFkMmZiYSIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiMTJkOGJjODYifQ.XRlQdBnH0huT1L0EpkJdscsev3LI0XV19T26a9dTOuJZsBwGNnEs4ajVjGNLHx5q0RUl5XLwnfltJxwd43f-JQ';

const editorToolbar = useTemplateRef('editorToolbarElement');
const editorMenuBar = useTemplateRef('editorMenuBarElement');
const editorWordCount = useTemplateRef('editorWordCountElement');

const cloud = useCKEditorCloud({ version: '44.3.0' });

const isLayoutReady = ref(false);
const isEditorReady = ref(false);

const editor = computed(() => {
  if (!cloud.data.value) {
    return null;
  }

  return cloud.data.value.CKEditor.DecoupledEditor;
});

const config = computed(() => {
  if (!isLayoutReady.value) {
    return null;
  }

  if (!cloud.data.value) {
    return null;
  }

  const {
    Alignment,
    Autoformat,
    AutoImage,
    AutoLink,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    Bold,
    Bookmark,
    Code,
    CodeBlock,
    Emoji,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlComment,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageEditing,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    ImageUtils,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    Mention,
    PageBreak,
    Paragraph,
    PasteFromMarkdownExperimental,
    PasteFromOffice,
    RemoveFormat,
    ShowBlocks,
    SimpleUploadAdapter,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Style,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    TextTransformation,
    TodoList,
    Underline,
    WordCount
  } = cloud.data.value.CKEditor;

  return {
    toolbar: {
      items: [
        'showBlocks',
        '|',
        'heading',
        'style',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        'insertImage',
        'insertTable',
        'highlight',
        'blockQuote',
        'codeBlock',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        'outdent',
        'indent'
      ],
      shouldNotGroupWhenFull: false
    },
    plugins: [
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      Bookmark,
      Code,
      CodeBlock,
      Emoji,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageEditing,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      ImageUtils,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Mention,
      PageBreak,
      Paragraph,
      PasteFromMarkdownExperimental,
      PasteFromOffice,
      RemoveFormat,
      ShowBlocks,
      SimpleUploadAdapter,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextPartLanguage,
      TextTransformation,
      TodoList,
      Underline,
      WordCount
    ],
    balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
    fontFamily: {
      supportAllValues: true
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true
    },
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
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5'
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6'
        }
      ]
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true
        }
      ]
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage'
      ]
    },
    initialData: '',
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file'
          }
        }
      }
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },
    mention: {
      feeds: [
        {
          marker: '@',
          feed: [
            /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
          ]
        }
      ]
    },
    menuBar: {
      isVisible: true
    },
    placeholder: 'Type or paste your content here!',
    style: {
      definitions: [
        {
          name: 'Article category',
          element: 'h3',
          classes: ['category']
        },
        {
          name: 'Title',
          element: 'h2',
          classes: ['document-title']
        },
        {
          name: 'Subtitle',
          element: 'h3',
          classes: ['document-subtitle']
        },
        {
          name: 'Info box',
          element: 'p',
          classes: ['info-box']
        },
        {
          name: 'Side quote',
          element: 'blockquote',
          classes: ['side-quote']
        },
        {
          name: 'Marker',
          element: 'span',
          classes: ['marker']
        },
        {
          name: 'Spoiler',
          element: 'span',
          classes: ['spoiler']
        },
        {
          name: 'Code (dark)',
          element: 'pre',
          classes: ['fancy-code', 'fancy-code-dark']
        },
        {
          name: 'Code (bright)',
          element: 'pre',
          classes: ['fancy-code', 'fancy-code-bright']
        }
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    }
  };
});
const route = useRoute()
const id = computed(() => route.query.id)
onMounted(() => {
  isLayoutReady.value = true;
  getArticle()
});
const getArticle = async()=>{
  if (!id.value) return;
  const article = await articleDetailData(id.value)
  content.value = article.content
  
}
function onReady(editor) {
  [...editorWordCount.value.children].forEach(child => child.remove());
  [...editorToolbar.value.children].forEach(child => child.remove());
  [...editorMenuBar.value.children].forEach(child => child.remove());

  const wordCount = editor.plugins.get('WordCount');
  editorWordCount.value.appendChild(wordCount.wordCountContainer);
  editorToolbar.value.appendChild(editor.ui.view.toolbar.element);
  editorMenuBar.value.appendChild(editor.ui.view.menuBarView.element);
  isEditorReady.value = true
}

const content = ref('');
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  font-family: "oppo-sans";
  overflow: hidden;

  .middle {
    flex: 1;
  }
}

.btn-wrapper {
  padding: var(--ck-spacing-small);
}
</style>