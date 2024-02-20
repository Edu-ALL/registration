<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container-fluid p-0">
    <vue3-progress-bar></vue3-progress-bar>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" key="$route.fullPath" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.vue3-progress-bar {
  height: 5px !important;
  background: rgb(29, 5, 109) !important;
  opacity: .4;
}
</style>