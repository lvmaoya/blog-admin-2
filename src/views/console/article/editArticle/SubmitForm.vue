<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Loader2 } from "lucide-vue-next";
import { ArrowUp } from "lucide-vue-next";

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { computed, onMounted, ref, watch } from "vue";
import FileUpload from "@/components/upload/index.vue";
import CategorySelect from "@/components/category-select/index.vue";
import { uploadFile } from "@/service/upload";
import { postArticle } from "@/service/article";
import type PostArticle from "./type.ts";
import { Checkbox } from "@/components/ui/checkbox";

const emit = defineEmits(["resetEditor"]);

const files = ref([]);
const initUrl = ref();
const loading = ref(false);
const submitMode = ref<"publish" | "draft" | null>(null);
const dialogOpen = ref(false); // 控制 Dialog 的显示状态

const formData = ref({
  id: null,
  title: "",
  keywords: "",
  description: "",
  categoryValue: [null, null] as [number, number], // 替换原来的 categoryId 和 fatherCategoryId
  coverImage: null,
  content: "",
  charCount: 0,
  status: 0,
  keepDesc: false,
});

const isEditing = computed(
  () => formData.value.id !== null && formData.value.id !== undefined,
);

const currentStatusLabel = computed(() =>
  formData.value.status === 1 ? "已发布" : "暂存中",
);

async function onSubmit() {
  loading.value = true;
  try {
    let submitData = {
      ...formData.value,
      fatherCategoryId: null,
      categoryId: null,
      status: formData.value.status,
      charCount: formData.value.content.length,
    };
    // 处理分类数据
    if (formData.value.categoryValue) {
      submitData.fatherCategoryId = formData.value.categoryValue[0];
      submitData.categoryId = formData.value.categoryValue[1];
    }
    delete submitData.categoryValue;
    let res = await uploadFiles();
    submitData.coverImage = res;
    await postArticle(submitData);

    toast({
      title: "🔔 提示",
      description: submitData.id
        ? "文章更新成功！"
        : submitData.status === 0
          ? "文章暂存成功！"
          : "文章发布成功！",
    });
    dialogOpen.value = false;

    // 重置表单
    formData.value = {
      id: null,
      title: "",
      keywords: "",
      description: "",
      categoryValue: [null, null],
      coverImage: null,
      content: "",
      charCount: 0,
      status: 0,
      keepDesc: false,
    };
    files.value = [];
    initUrl.value = undefined;

    // 发送重置事件给父组件
    emit("resetEditor");
  } catch (error) {
    toast({
      title: "🔔 提示",
      description: "保存失败，请稍后重试",
      variant: "destructive",
    });
    console.error(error);
  } finally {
    loading.value = false;
    submitMode.value = null;
  }
}
const validateSubmitRequiredFields = () => {
  const title = formData.value.title?.trim();
  const [fatherCategoryId, categoryId] = formData.value.categoryValue || [];

  if (!title && (fatherCategoryId == null || categoryId == null)) {
    toast({
      title: "🔔 提示",
      description: "请先填写标题并选择分类",
      variant: "destructive",
    });
    return false;
  }

  if (!title) {
    toast({
      title: "🔔 提示",
      description: "请先填写标题",
      variant: "destructive",
    });
    return false;
  }

  if (fatherCategoryId == null || categoryId == null) {
    toast({
      title: "🔔 提示",
      description: "请先选择分类",
      variant: "destructive",
    });
    return false;
  }

  return true;
};

const handleSubmit = () => {
  if (loading.value) {
    return;
  }
  if (!validateSubmitRequiredFields()) {
    return;
  }
  submitMode.value = "publish";
  formData.value.status = 1;
  onSubmit();
};

const handleHoldOn = () => {
  if (loading.value) {
    return;
  }
  submitMode.value = "draft";
  formData.value.keepDesc = true;
  formData.value.status = 0;
  onSubmit();
};
const handleError = (error: string) => {
  console.error("上传错误:", error);
};

// 上传文件的方法
const uploadFiles = async () => {
  console.log(files.value);

  if (files.value.length === 0) {
    return;
  }
  const formData = new FormData();
  files.value.forEach((file) => {
    formData.append("file", file);
  });
  try {
    const response = await uploadFile(formData);
    console.log(response);
    toast({
      title: "🔔 提示",
      description: "图片上传成功",
    });
    return response.url;
  } catch (error) {
    console.error("图片上传出错:", error);
    toast({
      title: "🔔 提示",
      description: "图片上传出错",
      variant: "destructive",
    });
  }
};

const props = defineProps<{ article: PostArticle }>();
watch(
  () => props.article,
  (newVal) => {
    if (props.article) {
      const shouldKeepDescByDefault =
        props.article.fatherCategoryId === 4 || props.article.status === 0;
      formData.value = {
        id: props.article.id,
        title: props.article.title,
        keywords: props.article.keywords,
        description: props.article.description,
        categoryValue: [
          props.article.fatherCategoryId,
          props.article.categoryId,
        ],
        content: props.article.content,
        charCount: props.article.charCount,
        coverImage: null,
        status: props.article.status,
        keepDesc: shouldKeepDescByDefault,
      };

      initUrl.value = props.article.coverImage;
    }
  },
  { deep: true },
);

// 添加监听器，当 fatherCategoryId 为 3 时自动勾选保持描述
watch(
  () => formData.value.categoryValue[0],
  (newFatherCategoryId) => {
    if (newFatherCategoryId === 4) {
      formData.value.keepDesc = true;
    }
  },
  { immediate: true },
);
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button
        class="submitBtn opacity-85"
        size="icon"
        @click="dialogOpen = true"
      >
        <ArrowUp class="w-4 h-4" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>{{ isEditing ? '编辑文章（' + currentStatusLabel + '）' : '发布文章' }}</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <Label>标题</Label>
            <Input
              v-model="formData.title"
              type="text"
              placeholder="请输入文章标题"
            />
          </div>

          <div>
            <Label>关键词</Label>
            <Input
              v-model="formData.keywords"
              type="text"
              placeholder="请输入关键词，如：aaa,bbb,ccc"
            />
          </div>

          <div>
            <Label>分类</Label>
            <CategorySelect v-model="formData.categoryValue" />
          </div>

          <div>
            <Label>描述</Label>
            <Textarea
              v-model="formData.description"
              placeholder="请输入文章描述"
            />
          </div>

          <div>
            <Label>封面</Label>
            <FileUpload
              v-model="files"
              :init-url="initUrl"
              accept="image/*,.pdf,.doc,.docx"
              :max-size="5"
              :max-files="1"
              @error="handleError"
            />
          </div>
        </div>

        <DialogFooter class="mt-4 !justify-between">
          <div class="flex items-center gap-2">
            <Checkbox v-model="formData.keepDesc" id="terms"></Checkbox>
            <label
              for="terms"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
            >
              保持描述
            </label>
          </div>
          <div class="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              :disabled="loading"
              @click="handleHoldOn"
            >
              <Loader2
                v-if="loading && submitMode === 'draft'"
                class="w-4 h-4 mr-2 animate-spin"
              />
              {{ loading && submitMode === "draft" ? "暂存中" : "暂存" }}
            </Button>
            <Button type="submit" :disabled="loading">
              <Loader2
                v-if="loading && submitMode === 'publish'"
                class="w-4 h-4 mr-2 animate-spin"
              />
              {{ loading && submitMode === "publish" ? "发布中" : "发布" }}
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped lang="scss">
.submitBtn {
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 99999;
  padding: 0 4px;
  border-radius: 50px;
}
</style>
