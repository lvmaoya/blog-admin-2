<script setup lang="ts">
import { ToastProvider, type ToastProviderProps } from 'reka-ui'

const props = defineProps<ToastProviderProps>()
</script>

<template>
  <ToastProvider v-bind="props" swipeDirection="up">
    <slot />
  </ToastProvider>
</template>
