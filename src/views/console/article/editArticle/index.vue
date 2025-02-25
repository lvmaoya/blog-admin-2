<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->
<template>
  <div class="container">
    <div class="middle">
      <div class="main-container">
        <div
          class="editor-container editor-container_document-editor editor-container_include-minimap editor-container_include-style editor-container_include-word-count"
          ref="editorContainerElement">
          <div class="editor-container__menu-bar" ref="editorMenuBarElement"></div>
          <div class="editor-container__toolbar" ref="editorToolbarElement"></div>
          <div class="editor-container__minimap-wrapper">
            <div class="editor-container__editor-wrapper">
              <div class="editor-container__editor">
                <div ref="editorElement">
                  <ckeditor v-if="editor && config" :editor="editor" :config="config" @ready="onReady" v-model="data"
                    @input="onEditorInput" />
                </div>
              </div>
            </div>
            <div class="editor-container__sidebar editor-container__sidebar_minimap">
              <div ref="editorMinimapElement"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="submitBtn">
        <button @click="handleSubmit">提交</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import "./assets/style.css"
import { computed, ref, onMounted, useTemplateRef } from 'vue';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';

import {
  DecoupledEditor,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
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
  Minimap,
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
  Title,
  TodoList,
  Underline
} from 'ckeditor5';

import translations from 'ckeditor5/translations/zh-cn.js';
import 'ckeditor5/ckeditor5.css';
import { postArticle } from "@/service/article";
import SubmitPlugin from './assets/SubmitPlugin'; // 引入自定义插件

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDA2MTQzOTksImp0aSI6ImJmMGI4MzQwLWEyNmUtNDI2Yi1iZjgwLTRlY2UzMGU4YjJiZiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjA3M2E0ODMyIn0.09qvzuvOIxHfmwh6aEY8b3hPzj4mJW_qPL5yf6lu1Yzzex_WT7Gd9yBmf9J3V9Et7GxhtMv3NnUfzbckplsVuw';

const editorToolbar = useTemplateRef('editorToolbarElement');
const editorMenuBar = useTemplateRef('editorMenuBarElement');
const editorMinimap = useTemplateRef('editorMinimapElement');

const isLayoutReady = ref(false);

const editor = DecoupledEditor;

const config = computed(() => {
  if (!isLayoutReady.value) {
    return null;
  }

  return {
    toolbar: {
      items: [
        'SubmitPlugin',
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
      Minimap,
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
      Title,
      TodoList,
      Underline,
    ],
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
    initialData:
      '',
    language: 'zh-cn',
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      // defaultProtocol: 'https://',
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
      isVisible: true,
      addItems: [
        {
          menu: {
            menuId: 'my-menu',
            label: 'My menu',
            groups: [
              {
                groupId: 'my-buttons',
                items: [
                  'menuBar:bold',
                  // 'menuBar:italic',
                  // 'menuBar:underline'
                ]
              }
            ]
          },
          position: 'end'
        },
        {
					group: {
						groupId: 'my-buttons',
						items: [
							'myButton1',
							'myButton2',
						]
					},
					position: 'after:basicStyles'
				}
      ]
    },
    minimap: {
      container: editorMinimap.value,
      extraClasses: 'editor-container_include-minimap ck-minimap__iframe-content'
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
    },
    translations: [translations]
  };
});


onMounted(() => {
  isLayoutReady.value = true;
});

function onReady(editor) {
  [...editorToolbar.value.children].forEach(child => child.remove());
  [...editorMenuBar.value.children].forEach(child => child.remove());

  editorToolbar.value.appendChild(editor.ui.view.toolbar.element);
  editorMenuBar.value.appendChild(editor.ui.view.menuBarView.element);
}

const data = ref('');
const onEditorInput = (editorData) => {
  console.log(editorData);
};
const handleSubmit = async () => {
  await postArticle(data.value);
};
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

  .submitBtn {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>