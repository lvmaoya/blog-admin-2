import CheckCircledIcon from '@radix-icons/vue/CheckCircledIcon'
import CrossCircledIcon from '@radix-icons/vue/CrossCircledIcon'
import QuestionMarkCircledIcon from '@radix-icons/vue/QuestionMarkCircledIcon'
import StopwatchIcon from '@radix-icons/vue/StopwatchIcon'
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CircleIcon } from 'lucide-vue-next'
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
    label: 'Todo',
    icon: h(CircleIcon),
  },
  {
    value: "1",
    label: 'In Progress',
    icon: h(StopwatchIcon),
  },
  {
    value: "2",
    label: 'Done',
    icon: h(CheckCircledIcon),
  },
  {
    value: "3",
    label: 'Deleted',
    icon: h(CrossCircledIcon),
  },
]

export const categories = [
  {
    value: "1",
    label: 'Project',
    icon: h(ArrowDownIcon),
  },
  {
    value: "2",
    label: 'Study',
    icon: h(ArrowRightIcon),
  },
  {
    value: "3",
    label: 'Blog',
    icon: h(ArrowUpIcon),
  },
]
