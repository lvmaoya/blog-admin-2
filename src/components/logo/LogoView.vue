<template>
  <div class="logo" @click="handleLogoClick">LVMAOYA</div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogoClick = () => {
  router.push({
    name: "Home",
  });
};
</script>

<style lang="scss" scoped>
.logo {
  // width: 10%;
  font-size: 17;
  cursor: pointer;
  user-select: none;
  width: 100px;
}
</style>
