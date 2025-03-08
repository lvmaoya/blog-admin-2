import { FolderRoot, BookOpenText, NotebookPen, AlarmClockCheck, GitPullRequestDraft, Trash2, CheckCheck } from 'lucide-vue-next'
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
    value: "0",
    label: 'TODO',
    icon: h(AlarmClockCheck),
  },
  {
    value: "1",
    label: 'DRAFT',
    icon: h(GitPullRequestDraft),
  },
  {
    value: "2",
    label: 'PUBLISHED',
    icon: h(CheckCheck),
  },
  {
    value: "3",
    label: 'DELETED',
    icon: h(Trash2),
  },
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
