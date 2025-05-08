import { FolderRoot, BookOpenText, NotebookPen, AlarmClockCheck, BookDashed, X, CheckCheck } from 'lucide-vue-next'
import { h } from 'vue'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 0,
    label: '暂存',
    icon: h(BookDashed),
  },
  {
    value: 1,
    label: '发布',
    icon: h(CheckCheck),
  }
]

export const categories = [
  {
    value: 1,
    label: '项目',
    icon: h(FolderRoot),
  },
  {
    value:2,
    label: '学习',
    icon: h(BookOpenText),
  },
  {
    value: 3,
    label: '随笔',
    icon: h(NotebookPen),
  },
]
