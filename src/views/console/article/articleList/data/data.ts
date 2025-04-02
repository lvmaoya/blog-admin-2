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
    label: 'DRAFT',
    icon: h(BookDashed),
  },
  {
    value: 1,
    label: 'PUBLISHED',
    icon: h(CheckCheck),
  }
]

export const categories = [
  {
    value: "1",
    label: 'PROJECT',
    icon: h(FolderRoot),
  },
  {
    value: "2",
    label: 'STUDY',
    icon: h(BookOpenText),
  },
  {
    value: "3",
    label: 'BLOG',
    icon: h(NotebookPen),
  },
]
