<template>
  <div>
    <TitleBar />
    <div class="grid grid-cols-12 h-full">
      <SideBar class="col-span-2"/>
      <router-view class="col-span-10 h-[calc(100vh_-_73px)]"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBar from './title.vue';
import SideBar from './sidebar.vue';
</script>
