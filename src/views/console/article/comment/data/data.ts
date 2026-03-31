import { FolderRoot, BookOpenText, NotebookPen, AlarmClockCheck, BookDashed, X, CheckCheck } from 'lucide-vue-next'
import { h } from 'vue'

export const labels = [
  {
    value: 'bug',
    label: '问题',
  },
  {
    value: 'feature',
    label: '功能',
  },
  {
    value: 'documentation',
    label: '文档',
  },
]

export const statuses = [
  {
    value: "0",
    label: '待处理',
    icon: h(AlarmClockCheck),
  },
  {
    value: "1",
    label: '草稿',
    icon: h(BookDashed),
  },
  {
    value: "2",
    label: '已发布',
    icon: h(CheckCheck),
  },
  {
    value: "3",
    label: '已删除',
    icon: h(X),
  },
]

export const categories = [
  {
    value: "1",
    label: '项目',
    icon: h(FolderRoot),
  },
  {
    value: "2",
    label: '学习',
    icon: h(BookOpenText),
  },
  {
    value: "3",
    label: '随笔',
    icon: h(NotebookPen),
  },
]
