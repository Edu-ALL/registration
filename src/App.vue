<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container-fluid p-0">
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
</style>